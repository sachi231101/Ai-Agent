import React, { useState } from 'react';
import { X, Code2, Copy, Check, Download, Terminal, Layers, FileCode, Sparkles } from 'lucide-react';
import type { AgentSpecification } from '../../types';

interface AgentCodeExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  spec: AgentSpecification | null;
  agentName: string;
}

export function AgentCodeExporterModal({
  isOpen,
  onClose,
  spec,
  agentName,
}: AgentCodeExporterModalProps) {
  const [activeTab, setActiveTab] = useState<'python' | 'node' | 'openapi' | 'docker'>('python');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !spec) return null;

  const pythonSnippet = `import os
from openai import OpenAI

# Initialize Vibe Agent - ${spec.agentName}
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

SYSTEM_PROMPT = """${spec.systemPrompt || 'You are an autonomous AI Agent built on Vibe Agent platform.'}"""

def run_agent(user_query: str):
    response = client.chat.completions.create(
        model="${spec.model || 'gpt-4o'}",
        temperature=${spec.temperature || 0.3},
        max_tokens=${spec.maxTokens || 4096},
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_query}
        ]
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    result = run_agent("Test Vibe Agent deployment runtime")
    print(result)
`;

  const nodeSnippet = `import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = \`${spec.systemPrompt || 'You are an autonomous AI Agent.'}\`;

export async function executeAgent(userQuery: string) {
  const completion = await openai.chat.completions.create({
    model: '${spec.model || 'gpt-4o'}',
    temperature: ${spec.temperature || 0.3},
    max_tokens: ${spec.maxTokens || 4096},
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userQuery }
    ]
  });
  return completion.choices[0].message.content;
}
`;

  const openapiSnippet = `openapi: 3.0.0
info:
  title: ${spec.agentName} API
  version: "${spec.version || '1.0.0'}"
  description: Autonomous Vibe Agent REST API endpoint.
paths:
  /v1/agents/${agentName.toLowerCase().replaceAll(' ', '-')}/execute:
    post:
      summary: Trigger agent execution run
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                prompt:
                  type: string
      responses:
        '200':
          description: Agent execution response payload
`;

  const dockerSnippet = `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "main.py"]
`;

  const currentSnippet =
    activeTab === 'python'
      ? pythonSnippet
      : activeTab === 'node'
      ? nodeSnippet
      : activeTab === 'openapi'
      ? openapiSnippet
      : dockerSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12101b] border border-white/10 rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-6 text-white animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Code2 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Export Agent Deployment Code</h2>
              <p className="text-xs text-white/50">Generate ready-to-deploy SDK code snippets & container specs.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center border-b border-white/10 space-x-4 text-xs font-semibold text-white/50">
          {[
            { id: 'python', label: 'Python SDK' },
            { id: 'node', label: 'Node.js SDK' },
            { id: 'openapi', label: 'OpenAPI 3.0 YAML' },
            { id: 'docker', label: 'Dockerfile' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Content */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="font-mono">Language: {activeTab.toUpperCase()}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-[#0a0812] border border-white/10 text-xs font-mono text-purple-200/90 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
            {currentSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
}
