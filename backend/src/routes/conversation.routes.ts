import { Router } from 'express';
import conversationController from '../controllers/conversation.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { authenticateJwt } from '../middlewares/auth.middleware';
import {
  createConversationSchema,
  sendMessageSchema,
  conversationIdParamSchema,
} from '../validators/conversation.validator';

const router = Router();

// Apply authentication middleware to all conversation routes
router.use(authenticateJwt);

/**
 * @route POST /api/v1/conversations or /api/v1/conversation
 * @desc  Create a new conversation session
 */
router.post(
  ['/conversations', '/conversation'],
  validateRequest(createConversationSchema),
  conversationController.createConversation
);

/**
 * @route POST /api/v1/chat/message or /api/v1/conversations/message
 * @desc  Send a natural language prompt to the AI Conversation Engine
 */
router.post(
  ['/chat/message', '/conversations/message', '/conversation/message'],
  validateRequest(sendMessageSchema),
  conversationController.sendMessage
);

/**
 * @route GET /api/v1/conversation/:id or /api/v1/conversations/:id
 * @desc  Get conversation status & current state
 */
router.get(
  ['/conversation/:id', '/conversations/:id'],
  validateRequest(conversationIdParamSchema),
  conversationController.getConversation
);

/**
 * @route GET /api/v1/conversation/:id/messages or /api/v1/conversations/:id/messages
 * @desc  Get full message history for a conversation
 */
router.get(
  ['/conversation/:id/messages', '/conversations/:id/messages'],
  validateRequest(conversationIdParamSchema),
  conversationController.getMessages
);

/**
 * @route GET /api/v1/conversation/:id/specification or /api/v1/conversations/:id/specification
 * @desc  Get generated Agent Specification for a conversation
 */
router.get(
  ['/conversation/:id/specification', '/conversations/:id/specification'],
  validateRequest(conversationIdParamSchema),
  conversationController.getSpecification
);

export default router;
