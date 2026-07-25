import { z } from 'zod';

export const createConversationSchema = z.object({
  body: z.object({
    workspaceId: z.union([z.string().uuid(), z.literal(''), z.null()]).optional(),
    initialTitle: z.string().max(200).optional(),
  }),
});

export const sendMessageSchema = z.object({
  body: z.object({
    conversationId: z.string().uuid({ message: 'Valid conversationId UUID is required' }),
    content: z.string().min(1, { message: 'Message content cannot be empty' }).max(10000),
  }),
});

export const conversationIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Valid conversation ID UUID is required' }),
  }),
});
