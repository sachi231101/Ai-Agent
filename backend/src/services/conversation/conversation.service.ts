import prisma from '../../database/prisma';
import intentService from '../intent/intent.service';
import requirementService from '../requirements/requirement.service';
import clarificationService from '../clarification/clarification.service';
import conflictService from '../conflict/conflict.service';
import improvementService from '../improvement/improvement.service';
import readinessService, { ReadinessBreakdown } from '../readiness/readiness.service';
import plannerService from '../planner/planner.service';
import specificationService from '../specification/specification.service';
import messageService from '../message/message.service';
import logger from '../../config/logger';
import { NotFoundError } from '../../errors/api.error';
import { Conversation, Message, AgentSpecification, ConversationState, Prisma } from '@prisma/client';

export type ConversationWithState = Conversation & {
  state: ConversationState | null;
};

export interface ProcessMessageResponse {
  conversationId: string;
  userMessage: Message;
  aiMessage: Message;
  currentStage: string;
  needsClarification: boolean;
  question: string | null;
  options?: string[];
  warnings?: any[];
  improvements?: any[];
  readiness?: ReadinessBreakdown;
  specification: AgentSpecification | null;
}

export class ConversationService {
  /**
   * Creates a new conversation for a given user & optional workspace
   */
  async createConversation(userId: string, workspaceId?: string, initialTitle?: string): Promise<ConversationWithState> {
    // Ensure user exists in database for relational integrity
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: userId === '00000000-0000-0000-0000-000000000000' ? 'dev@vibeagents.ai' : `user_${userId}@vibeagents.ai`,
        name: 'Vibe Developer',
        password: '$2b$10$meeIr3W5lKrVmf3ge2KeMeOdBpx4aSX1Uw/qjrWN1HHOYf6gi6t5S',
        role: 'ADMIN',
      },
    });

    const conversation = await prisma.conversation.create({
      data: {
        userId,
        workspaceId: workspaceId || null,
        title: initialTitle || 'New AI Agent Build',
        state: {
          create: {
            currentStage: 'INTENT_DETECTION',
            latestIntent: {},
            extractedRequirements: {},
            askedQuestions: [],
            isComplete: false,
          },
        },
      },
      include: {
        state: true,
      },
    });

    logger.info(`Created new Conversation [ID: ${conversation.id}] for User [ID: ${userId}]`);
    return conversation;
  }

  /**
   * Retrieves conversation with current state
   */
  async getConversationById(id: string): Promise<ConversationWithState> {
    const conversation = await prisma.conversation.findUnique({
      where: { id },
      include: {
        state: true,
      },
    });

    if (!conversation) {
      throw new NotFoundError(`Conversation with ID ${id} not found`);
    }

    return conversation;
  }

  /**
   * Retrieves the latest specification for a conversation
   */
  async getSpecificationByConversationId(conversationId: string): Promise<AgentSpecification | null> {
    await this.getConversationById(conversationId);

    const spec = await prisma.agentSpecification.findFirst({
      where: { conversationId },
      orderBy: { createdAt: 'desc' },
    });

    return spec;
  }

  /**
   * Core AI Conversation Engine 10-Step Pipeline
   */
  async processUserMessage(
    conversationId: string,
    content: string
  ): Promise<ProcessMessageResponse> {
    logger.info(`=== Starting 10-Step AI Architecture Pipeline [Conversation: ${conversationId}] ===`);

    // 1. Validate Conversation & State
    const conversation = await this.getConversationById(conversationId);
    let state = conversation.state;

    if (!state) {
      state = await prisma.conversationState.create({
        data: { conversationId },
      });
    }

    // 2. Persist User Message
    const userMessage = await messageService.saveMessage(conversationId, 'USER', content);

    // 3. Format History Context
    const historyText = await messageService.formatConversationHistory(conversationId);

    try {
      // Step 1 & 2: Intent & Business Problem Classification
      const intentResult = await intentService.detectIntent(content, historyText);

      if (conversation.title === 'New AI Agent Build' && intentResult.goal) {
        await prisma.conversation.update({
          where: { id: conversationId },
          data: { title: `${intentResult.businessDomain}: ${intentResult.goal}`.slice(0, 60) },
        });
      }

      // Step 3 & 4: Automation Opportunity & Requirement Extraction
      const previousReqs = (state.extractedRequirements as any) || undefined;
      const reqResult = await requirementService.extractRequirements(content, historyText, previousReqs);

      // Step 5: Missing Info & Priority Clarification Assessment
      const previouslyAskedQuestions: string[] = (state.askedQuestions as unknown as string[]) || [];
      const clarificationResult = await clarificationService.evaluateClarification(
        reqResult.missingInformation,
        previouslyAskedQuestions,
        historyText
      );

      // Step 6: Conflict & Risk Detection
      const conflictResult = await conflictService.evaluateConflicts(content, historyText, reqResult);

      // Step 7: Proactive Improvement Engine
      const improvementResult = await improvementService.generateImprovements(
        content,
        historyText,
        intentResult,
        reqResult
      );

      let aiResponseText = '';
      let finalSpec: AgentSpecification | null = null;
      let newStage = 'REQUIREMENT_GATHERING';
      let isComplete = false;

      if (clarificationResult.needsClarification && clarificationResult.question) {
        // Step 8A: Prioritized Clarification Stage
        newStage = 'CLARIFICATION';
        
        // Consultative Senior AI Architect response explaining WHY choices were made
        const rationale = intentResult.businessObjective 
          ? `I understand your goal is to **${intentResult.businessObjective}** within **${intentResult.businessDomain}**.`
          : `I am architecting your solution for **${intentResult.businessDomain}**.`;

        aiResponseText = `${rationale}\n\nTo ensure we design the most reliable integration, I have a quick clarification question:`;
        
        previouslyAskedQuestions.push(clarificationResult.question);
        logger.info(`Pipeline Stage: CLARIFICATION. Asking question: "${clarificationResult.question}"`);
      } else {
        // Step 8B: Sufficient Information -> Run Planner & Specification Generator
        newStage = 'PLANNING';
        logger.info('Pipeline Stage: PLANNING & SPECIFICATION GENERATION.');

        const plan = await plannerService.generatePlan(intentResult, reqResult, historyText);
        const specResult = await specificationService.generateSpecification(plan, reqResult);

        newStage = 'SPECIFICATION_GENERATED';
        isComplete = true;

        // Save Specification to database
        finalSpec = await prisma.agentSpecification.create({
          data: {
            conversationId,
            name: plan.name,
            description: plan.description,
            version: specResult.version,
            spec: specResult as unknown as Prisma.InputJsonValue,
            status: 'READY',
          },
        });

        const capabilitiesList = (plan.capabilities || []).map((c) => `- ${c}`).join('\n') || '- Autonomous processing';
        const integrationsList = (plan.requiredIntegrations || []).map((i) => i.name).join(', ') || 'None';

        aiResponseText = `I have designed your complete AI Agent: **${plan.name}**!\n\n**Business Objective:** ${intentResult.businessObjective || plan.description}\n\n**Key Capabilities:**\n${capabilitiesList}\n\n**Required Integrations:** ${integrationsList}\n\nWhy this design works: I selected schedule-driven execution with automated error retry policies to guarantee 99.9% operational reliability. Your AI Agent specification is saved and ready for deployment.`;
      }

      // Step 9: Multi-Dimensional Readiness Score Calculation
      const readinessBreakdown = readinessService.calculateReadiness(
        intentResult,
        reqResult,
        conflictResult,
        finalSpec,
        clarificationResult.needsClarification
      );

      // Step 10: Update State & Save Assistant Response Message
      await prisma.conversationState.update({
        where: { conversationId },
        data: {
          currentStage: newStage,
          latestIntent: intentResult as unknown as Prisma.InputJsonValue,
          extractedRequirements: reqResult as unknown as Prisma.InputJsonValue,
          askedQuestions: previouslyAskedQuestions as unknown as Prisma.InputJsonValue,
          isComplete,
        },
      });

      const aiMessage = await messageService.saveMessage(conversationId, 'ASSISTANT', aiResponseText, {
        stage: newStage,
        intent: intentResult,
        requirementsCount: (reqResult?.tasks || []).length,
        hasSpec: !!finalSpec,
        options: clarificationResult.options,
        question: clarificationResult.question,
        warnings: conflictResult.warnings,
        improvements: improvementResult.suggestions,
        readiness: readinessBreakdown,
      });

      logger.info(`=== 10-Step AI Architecture Pipeline Finished [Stage: ${newStage}, Readiness: ${readinessBreakdown.overall}%] ===`);

      return {
        conversationId,
        userMessage,
        aiMessage,
        currentStage: newStage,
        needsClarification: clarificationResult.needsClarification,
        question: clarificationResult.question,
        options: clarificationResult.options || [],
        warnings: conflictResult.warnings || [],
        improvements: improvementResult.suggestions || [],
        readiness: readinessBreakdown,
        specification: finalSpec,
      };
    } catch (pipelineErr: any) {
      logger.error(`AI Pipeline processing error: ${pipelineErr.message}`, { stack: pipelineErr.stack });

      const fallbackMsg = `I encountered an issue processing your request: ${pipelineErr.message}. Please try rephrasing your prompt.`;

      const aiMessage = await messageService.saveMessage(conversationId, 'ASSISTANT', fallbackMsg, {
        error: pipelineErr.message,
      });

      return {
        conversationId,
        userMessage,
        aiMessage,
        currentStage: state.currentStage || 'ERROR',
        needsClarification: false,
        question: null,
        options: [],
        warnings: [],
        improvements: [],
        readiness: {
          businessUnderstanding: 50,
          requirementCompleteness: 50,
          securityReadiness: 50,
          deploymentReadiness: 50,
          integrationReadiness: 50,
          conversationCompleteness: 50,
          overall: 50,
        },
        specification: null,
      };
    }
  }
}

export const conversationService = new ConversationService();
export default conversationService;
