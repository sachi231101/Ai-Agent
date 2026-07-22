import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Sparkles, Layers, FileCode, Globe } from 'lucide-react';
import type { DocumentStoreItem, VectorIndexConfig } from '../types';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  indices: VectorIndexConfig[];
  onUploadDocument: (doc: DocumentStoreItem) => void;
}

export function DocumentUploadModal({
  isOpen,
  onClose,
  indices,
  onUploadDocument,
}: DocumentUploadModalProps) {
  const [fileTitle, setFileTitle] = useState('');
  const [selectedFileType, setSelectedFileType] = useState<'PDF' | 'Markdown' | 'JSON' | 'Web Page'>('PDF');
  const [selectedIndexId, setSelectedIndexId] = useState<string>(indices[0]?.id || 'idx-1');
  const [contentPreview, setContentPreview] = useState(
    `# Technical Architecture Specification
Vibe Agent provides an autonomous multi-agent DAG execution framework supporting vector RAG indexing, custom tool bindings, and real-time event streaming.`
  );
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = fileTitle || `Document_${Date.now().toString().slice(-4)}.${selectedFileType.toLowerCase()}`;
    const selectedIndex = indices.find((i) => i.id === selectedIndexId) || indices[0];

    setIsProcessing(true);

    setTimeout(() => {
      const newDoc: DocumentStoreItem = {
        id: `doc-${Date.now()}`,
        title,
        fileType: selectedFileType,
        fileSize: '1.4 MB',
        indexId: selectedIndex.id,
        indexName: selectedIndex.name,
        chunksCount: 8,
        uploadedAt: 'Just now',
        status: 'processed',
        chunks: [
          {
            id: 'c-1',
            chunkIndex: 0,
            content: contentPreview.slice(0, 150),
            tokenCount: 42,
          },
          {
            id: 'c-2',
            chunkIndex: 1,
            content: 'Vibe Agent provides an autonomous multi-agent DAG execution framework supporting vector RAG indexing...',
            tokenCount: 58,
          },
        ],
      };

      onUploadDocument(newDoc);
      setIsProcessing(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border/60 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Upload size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Upload Document to Knowledge Base</h2>
              <p className="text-xs text-muted-foreground">Parse text, generate embeddings, and index into vector database.</p>
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
          {/* Target Vector Index Store */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Target Vector Index Store</label>
            <select
              value={selectedIndexId}
              onChange={(e) => setSelectedIndexId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            >
              {indices.map((idx) => (
                <option key={idx.id} value={idx.id}>
                  {idx.name} ({idx.provider} • {idx.embeddingModel})
                </option>
              ))}
            </select>
          </div>

          {/* File Name & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Document Title</label>
              <input
                type="text"
                placeholder="e.g. API_Specification_v2.pdf"
                value={fileTitle}
                onChange={(e) => setFileTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/60 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Document Format</label>
              <select
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              >
                <option value="PDF">PDF Document</option>
                <option value="Markdown">Markdown (.md)</option>
                <option value="JSON">JSON Dataset</option>
                <option value="Web Page">Web Page / URL</option>
              </select>
            </div>
          </div>

          {/* Drag and Drop Zone */}
          <div className="p-6 border-2 border-dashed border-border/60 hover:border-primary/50 rounded-2xl bg-background/50 text-center space-y-2 transition-all cursor-pointer">
            <Upload size={28} className="mx-auto text-primary" />
            <p className="text-xs font-bold text-foreground">Drag & drop files here, or click to browse</p>
            <p className="text-[11px] text-muted-foreground">Supports PDF, MD, TXT, JSON up to 50MB</p>
          </div>

          {/* Document Raw Content Preview */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Text Preview / Content snippet</label>
            <textarea
              rows={4}
              value={contentPreview}
              onChange={(e) => setContentPreview(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Footer */}
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
              disabled={isProcessing}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
            >
              <Sparkles size={15} />
              <span>{isProcessing ? 'Parsing & Vectorizing...' : 'Ingest & Index'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
