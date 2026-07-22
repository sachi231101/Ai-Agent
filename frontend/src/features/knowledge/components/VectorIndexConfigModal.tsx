import React, { useState } from 'react';
import { X, Database, Sparkles, Layers, Sliders, CheckCircle2, Shield, Info } from 'lucide-react';
import type { VectorIndexConfig, VectorProvider, MetricType, EmbeddingModel } from '../types';

interface VectorIndexConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateIndex: (newIndex: VectorIndexConfig) => void;
}

export function VectorIndexConfigModal({ isOpen, onClose, onCreateIndex }: VectorIndexConfigModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    provider: 'Pinecone' as VectorProvider,
    embeddingModel: 'text-embedding-3-large' as EmbeddingModel,
    dimensions: 3072,
    metric: 'Cosine' as MetricType,
    chunkSize: 512,
    chunkOverlap: 64,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newIndex: VectorIndexConfig = {
      id: `idx-${Date.now()}`,
      name: formData.name,
      provider: formData.provider,
      embeddingModel: formData.embeddingModel,
      dimensions: formData.dimensions,
      metric: formData.metric,
      totalVectors: 0,
      documentsCount: 0,
      status: 'ready',
      chunkSize: formData.chunkSize,
      chunkOverlap: formData.chunkOverlap,
      lastSynced: 'Just now',
    };

    onCreateIndex(newIndex);
    onClose();
  };

  const handleModelChange = (model: EmbeddingModel) => {
    let dims = 3072;
    if (model === 'text-embedding-3-small' || model === 'text-embedding-ada-002') dims = 1536;
    if (model === 'cohere-embed-v3') dims = 1024;
    setFormData((prev) => ({ ...prev, embeddingModel: model, dimensions: dims }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border/60 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Database size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Provision Vector Index Store</h2>
              <p className="text-xs text-muted-foreground">Configure RAG embedding models and vector database parameters.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Index Name & Vector Provider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Index Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. enterprise-kb-v1"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/60 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Vector DB Provider</label>
              <select
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value as VectorProvider })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              >
                <option value="Pinecone">Pinecone Serverless</option>
                <option value="PostgreSQL (pgvector)">PostgreSQL (pgvector)</option>
                <option value="Qdrant">Qdrant Cloud</option>
                <option value="Weaviate">Weaviate</option>
                <option value="ChromaDB">ChromaDB Local</option>
              </select>
            </div>
          </div>

          {/* Embedding Model & Dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Embedding Model</label>
              <select
                value={formData.embeddingModel}
                onChange={(e) => handleModelChange(e.target.value as EmbeddingModel)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              >
                <option value="text-embedding-3-large">OpenAI text-embedding-3-large (3072d)</option>
                <option value="text-embedding-3-small">OpenAI text-embedding-3-small (1536d)</option>
                <option value="text-embedding-ada-002">OpenAI text-embedding-ada-002 (1536d)</option>
                <option value="cohere-embed-v3">Cohere Embed v3 (1024d)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Similarity Distance Metric</label>
              <select
                value={formData.metric}
                onChange={(e) => setFormData({ ...formData, metric: e.target.value as MetricType })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              >
                <option value="Cosine">Cosine Similarity</option>
                <option value="Euclidean">Euclidean Distance (L2)</option>
                <option value="Dot Product">Dot Product</option>
              </select>
            </div>
          </div>

          {/* Chunking Parameters */}
          <div className="p-4 rounded-2xl bg-background/60 border border-border/50 space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Document Chunking Strategy</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Chunk Size (Tokens)</label>
                <input
                  type="number"
                  step="64"
                  min="128"
                  max="2048"
                  value={formData.chunkSize}
                  onChange={(e) => setFormData({ ...formData, chunkSize: parseInt(e.target.value) || 512 })}
                  className="w-full px-3.5 py-2 rounded-xl bg-background border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Chunk Overlap (Tokens)</label>
                <input
                  type="number"
                  step="16"
                  min="0"
                  max="256"
                  value={formData.chunkOverlap}
                  onChange={(e) => setFormData({ ...formData, chunkOverlap: parseInt(e.target.value) || 64 })}
                  className="w-full px-3.5 py-2 rounded-xl bg-background border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-border/60 bg-card hover:bg-muted text-foreground text-xs font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 flex items-center gap-2 shadow-md transition-all"
            >
              <Database size={15} />
              <span>Provision Index</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
