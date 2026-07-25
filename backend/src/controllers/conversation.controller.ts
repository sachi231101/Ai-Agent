import { Request, Response, NextFunction } from 'express';
import conversationService from '../services/conversation/conversation.service';
import messageService from '../services/message/message.service';

export class ConversationController {
  /**
   * POST /api/v1/conversations
   */
  async createConversation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId || '00000000-0000-0000-0000-000000000000';
      const { workspaceId, initialTitle } = req.body;

      const conversation = await conversationService.createConversation(userId, workspaceId, initialTitle);

      res.status(201).json({
        success: true,
        data: conversation,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/v1/chat/message
   */
  async sendMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { conversationId, content } = req.body;

      const result = await conversationService.processUserMessage(conversationId, content);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/conversation/:id
   */
  async getConversation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const conversation = await conversationService.getConversationById(id);

      res.status(200).json({
        success: true,
        data: conversation,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/conversation/:id/messages
   */
  async getMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const messages = await messageService.getMessagesByConversation(id);

      res.status(200).json({
        success: true,
        data: messages,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/conversation/:id/specification
   */
  async getSpecification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const specification = await conversationService.getSpecificationByConversationId(id);

      res.status(200).json({
        success: true,
        data: specification,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const conversationController = new ConversationController();
export default conversationController;
