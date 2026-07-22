import { Request, Response, NextFunction } from 'express';
import { aiService } from './ai.service';
import { AIProvider } from '@config/ai.config';

export class AIController {
  async chat(req: Request, res: Response, next: NextFunction) {
    try {
      const { prompt, provider } = req.body;
      const result = await aiService.chat(prompt, provider as AIProvider);
      res.json({ success: true, data: { result } });
    } catch (err) {
      next(err);
    }
  }

  async stream(req: Request, res: Response, next: NextFunction) {
    try {
      const { prompt } = req.body;
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const openai = (await import('./providers/openai.provider')).OpenAIProvider;
      const provider = new openai();
      const stream = await provider.stream([{ role: 'user', content: prompt }]);

      for await (const chunk of stream as AsyncIterable<{ choices: { delta: { content?: string } }[] }>) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } catch (err) {
      next(err);
    }
  }

  async getProviders(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ success: true, data: aiService.getAvailableProviders() });
    } catch (err) {
      next(err);
    }
  }

  async runAgent(req: Request, res: Response, next: NextFunction) {
    try {
      const { agentId, input, provider } = req.body;
      // TODO: wire to agent execution pipeline
      res.json({ success: true, data: { agentId, input, provider, status: 'queued' } });
    } catch (err) {
      next(err);
    }
  }
}

export const aiController = new AIController();
