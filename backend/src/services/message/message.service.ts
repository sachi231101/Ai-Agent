import prisma from '../../database/prisma';
import { Message } from '@prisma/client';
import { NotFoundError } from '../../errors/api.error';

export class MessageService {
  async saveMessage(
    conversationId: string,
    sender: 'USER' | 'ASSISTANT' | 'SYSTEM',
    content: string,
    metadata: Record<string, any> = {}
  ): Promise<Message> {
    return prisma.message.create({
      data: {
        conversationId,
        sender,
        content,
        metadata: metadata || {},
      },
    });
  }

  async getMessagesByConversation(conversationId: string): Promise<Message[]> {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundError(`Conversation with ID ${conversationId} not found`);
    }

    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async formatConversationHistory(conversationId: string): Promise<string> {
    const messages = await this.getMessagesByConversation(conversationId);
    return messages
      .map((m) => `${m.sender.toUpperCase()}: ${m.content}`)
      .join('\n\n');
  }
}

export const messageService = new MessageService();
export default messageService;
