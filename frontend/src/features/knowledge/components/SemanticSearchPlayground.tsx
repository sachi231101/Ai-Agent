import React, { useState } from 'react';
import { Search, Sparkles, Database, FileText, CheckCircle2, Layers, ArrowRight, Sliders, Filter } from 'lucide-react';
import type { VectorIndexConfig, RAGSearchResult } from '../types';

interface SemanticSearchPlaygroundProps {
  indices: VectorIndexConfig[];
}

export function SemanticSearchPlayground({ indices }: SemanticSearchPlaygroundProps) {
  const [query, setQuery] = useState('How does Vibe Agent execute multi-agent DAG pipelines?');
  const [selectedIndexId, setSelectedIndexId] = useState<string>(indices[0]?.id || 'idx-1');
  const [topK, setTopK] = useState(3);
  const [similarityThreshold, setSimilarityThreshold] = useState(0.75);
  const [isSearching, setIsSearching] = useState(false);

  const [results, setResults] = useState<RAGSearchResult[]>([
    {
      chunkId: 'chk-101',
      docTitle: 'Vibe_Agent_Architecture.pdf',
      score: 0.942,
      content:
        'Vibe Agent utilizes an event-driven DAG execution model where agents coordinate via typed JSON payloads, shared state buffers, and asynchronous sub-agent hooks.',
      indexName: 'enterprise-kb-v1',
    },
    {
      chunkId: 'chk-102',
      docTitle: 'Multi_Agent_Orchestration.md',
      score: 0.885,
      content:
        'Each node in a Vibe Agent workflow can be assigned a dedicated LLM model (e.g., Claude 3.5 Sonnet, GPT-4o) and hyperparameter set to optimize latency and cost.',
      indexName: 'enterprise-kb-v1',
    },
    {
      chunkId: 'chk-103',
      docTitle: 'API_Specification.json',
      score: 0.812,
      content:
        'Vector retrieval tools automatically query vector stores using Cosine similarity over 3072-dimensional embeddings created by text-embedding-3-large.',
      indexName: 'enterprise-kb-v1',
    },
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
    }, 400);
  };

  return (
    <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles size={18} className="text-amber-500" />
            Semantic RAG Search Tester
          </h3>
          <p className="text-xs text-muted-foreground">
            Test vector similarity search, verify retrieved context chunks, and validate top-k relevance scores.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Target Index:</span>
            <select
              value={selectedIndexId}
              onChange={(e) => setSelectedIndexId(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-background border border-border/60 text-xs font-semibold text-foreground focus:outline-none"
            >
              {indices.map((idx) => (
                <option key={idx.id} value={idx.id}>
                  {idx.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Query Bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question or enter a semantic query to test RAG retrieval..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border/60 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 flex items-center gap-2 shadow-sm transition-all shrink-0"
        >
          <Search size={14} />
          <span>{isSearching ? 'Searching...' : 'Run RAG Query'}</span>
        </button>
      </form>

      {/* Controls Bar: TopK & Threshold Slider */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-background/60 border border-border/50 text-xs">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground font-medium">Top-K Chunk Limit ({topK}):</span>
          <input
            type="range"
            min="1"
            max="10"
            value={topK}
            onChange={(e) => setTopK(parseInt(e.target.value))}
            className="w-36 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground font-medium">Min Similarity Threshold ({similarityThreshold}):</span>
          <input
            type="range"
            min="0.5"
            max="0.95"
            step="0.05"
            value={similarityThreshold}
            onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
            className="w-36 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>Matching Vector Text Chunks ({results.length})</span>
          <span>Metric: Cosine Distance</span>
        </div>

        <div className="space-y-3">
          {results.map((res, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-background border border-border/60 hover:border-primary/50 transition-all space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-primary" />
                  <span className="font-bold text-foreground">{res.docTitle}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">[{res.chunkId}]</span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[11px] font-mono font-bold">
                  <span>Score: {(res.score * 100).toFixed(1)}%</span>
                </div>
              </div>

              <p className="text-xs text-foreground/90 font-mono bg-card/60 p-3 rounded-lg border border-border/40 leading-relaxed">
                {res.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
