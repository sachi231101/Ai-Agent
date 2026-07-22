import React, { useState } from 'react';
import {
  Database,
  Plus,
  Upload,
  Search,
  Sparkles,
  FileText,
  Plug,
  CheckCircle2,
  Clock,
  Layers,
  Trash2,
  ExternalLink,
  Shield,
  Activity,
  Sliders,
  RefreshCw,
} from 'lucide-react';
import { VectorIndexConfigModal } from '../components/VectorIndexConfigModal';
import { DocumentUploadModal } from '../components/DocumentUploadModal';
import { SemanticSearchPlayground } from '../components/SemanticSearchPlayground';
import { DataConnectorsGrid } from '../components/DataConnectorsGrid';
import type { VectorIndexConfig, DocumentStoreItem } from '../types';
import { useKnowledgeList, useCreateKnowledge, useDeleteKnowledge } from '../hooks/useKnowledge';

export default function KnowledgePage() {
  const { data: apiKnowledge, isLoading, refetch } = useKnowledgeList();
  const createKnowledgeMutation = useCreateKnowledge();
  const deleteKnowledgeMutation = useDeleteKnowledge();

  const [activeTab, setActiveTab] = useState<'indices' | 'documents' | 'connectors' | 'tester'>('indices');
  const [localIndices, setLocalIndices] = useState<VectorIndexConfig[]>([]);
  const [localDocuments, setLocalDocuments] = useState<DocumentStoreItem[]>([]);

  // Modals
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const indices: VectorIndexConfig[] =
    Array.isArray(apiKnowledge) && apiKnowledge.length > 0
      ? (apiKnowledge as any)
      : localIndices;

  const documents: DocumentStoreItem[] = localDocuments;

  const handleCreateIndex = (newIndex: VectorIndexConfig) => {
    setLocalIndices((prev) => [newIndex, ...prev]);
    createKnowledgeMutation.mutate(newIndex);
  };

  const handleUploadDocument = (newDoc: DocumentStoreItem) => {
    setLocalDocuments((prev) => [newDoc, ...prev]);
    setLocalIndices((prev) =>
      prev.map((idx) =>
        idx.id === newDoc.indexId
          ? { ...idx, documentsCount: idx.documentsCount + 1, totalVectors: idx.totalVectors + newDoc.chunksCount * 2 }
          : idx
      )
    );
  };

  const handleDeleteDocument = (docId: string) => {
    setLocalDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  const handleDeleteIndex = (indexId: string) => {
    setLocalIndices((prev) => prev.filter((i) => i.id !== indexId));
    deleteKnowledgeMutation.mutate(indexId);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
            <Database size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Knowledge Base & RAG Stores</h1>
            <p className="text-sm text-muted-foreground">
              Manage vector database indices, document chunking pipelines, enterprise data connectors, and RAG retrieval.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="p-2 rounded-xl border border-border/60 bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            title="Refresh Knowledge Base from Backend"
          >
            <RefreshCw size={15} className={isLoading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2 rounded-xl border border-border/60 bg-card hover:bg-muted text-foreground text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <Upload size={15} />
            <span>Ingest Document</span>
          </button>

          <button
            onClick={() => setIsProvisionModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 flex items-center gap-2 shadow-md transition-all"
          >
            <Plus size={15} />
            <span>Provision Vector Index</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">Vector Index Stores</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">{indices.length}</h3>
            <p className="text-xs text-emerald-500 mt-1 font-medium flex items-center gap-1">
              <CheckCircle2 size={12} /> Operational API
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center">
            <Database size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">Total Embeddings</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">
              {indices.reduce((acc, i) => acc + (i.totalVectors || 0), 0)}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">across all indices</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
            <Layers size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">Ingested Documents</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">{documents.length}</h3>
            <p className="text-xs text-muted-foreground mt-1">PDF, MD, JSON, Web</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20 flex items-center justify-center">
            <FileText size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">Avg RAG Latency</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">45ms</h3>
            <p className="text-xs text-emerald-500 mt-1 font-medium">Sub-second retrieval</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
            <Activity size={22} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-border/50 space-x-6 text-xs font-medium text-muted-foreground">
        {[
          { id: 'indices', label: 'Vector Index Stores', icon: Database },
          { id: 'documents', label: 'Document Collections', icon: FileText },
          { id: 'connectors', label: 'Data Connectors', icon: Plug },
          { id: 'tester', label: 'Semantic RAG Search Tester', icon: Search },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
                isActive
                  ? 'border-primary text-primary font-semibold'
                  : 'border-transparent hover:text-foreground'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Vector Index Stores */}
      {activeTab === 'indices' && (
        indices.length === 0 ? (
          <div className="p-12 border border-dashed border-border/60 rounded-3xl text-center space-y-4 bg-card/20 backdrop-blur-md">
            <div className="w-14 h-14 rounded-2xl bg-muted border border-border/50 flex items-center justify-center text-muted-foreground mx-auto">
              <Database size={26} />
            </div>
            <h3 className="text-base font-bold text-foreground">No Vector Index Stores Provisioned</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Your backend database currently has no vector index stores. Provision an index store to begin embedding documents.
            </p>
            <button
              onClick={() => setIsProvisionModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 inline-flex items-center gap-2 transition-all shadow-sm"
            >
              <Plus size={14} />
              <span>Provision Index</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {indices.map((index) => (
              <div
                key={index.id}
                className="group p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/50 transition-all shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider">
                      {index.provider}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        ● {index.status}
                      </span>
                      <button
                        onClick={() => handleDeleteIndex(index.id)}
                        title="Delete Index"
                        className="p-1 rounded text-muted-foreground hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-foreground">{index.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5 font-mono">
                    <Sparkles size={11} className="text-amber-500" />
                    {index.embeddingModel} ({index.dimensions}d)
                  </p>
                </div>

                <div className="pt-4 border-t border-border/40 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Total Vectors</span>
                    <span className="font-bold text-foreground font-mono">{index.totalVectors?.toLocaleString() || '0'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Distance Metric</span>
                    <span className="font-semibold text-foreground">{index.metric}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Tab 2: Document Collections */}
      {activeTab === 'documents' && (
        <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Ingested Document Store</h3>
            <span className="text-xs text-muted-foreground">{documents.length} files parsed</span>
          </div>

          {documents.length === 0 ? (
            <div className="p-8 border border-dashed border-border/50 rounded-2xl text-center space-y-3">
              <p className="text-xs text-muted-foreground">No documents ingested yet. Click "Ingest Document" above to upload PDF, Markdown, or JSON files.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Document Title</th>
                    <th className="py-3 px-4">Target Index</th>
                    <th className="py-3 px-4">Format</th>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Vector Chunks</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-muted/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-foreground flex items-center gap-2">
                        <FileText size={16} className="text-primary" />
                        {doc.title}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground font-mono">{doc.indexName}</td>
                      <td className="py-3.5 px-4 text-foreground">{doc.fileType}</td>
                      <td className="py-3.5 px-4 text-muted-foreground font-mono">{doc.fileSize}</td>
                      <td className="py-3.5 px-4 text-foreground font-mono font-semibold">{doc.chunksCount} chunks</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Data Connectors */}
      {activeTab === 'connectors' && <DataConnectorsGrid />}

      {/* Tab 4: Semantic Search Tester */}
      {activeTab === 'tester' && <SemanticSearchPlayground indices={indices} />}

      {/* Modals */}
      <VectorIndexConfigModal
        isOpen={isProvisionModalOpen}
        onClose={() => setIsProvisionModalOpen(false)}
        onCreateIndex={handleCreateIndex}
      />

      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        indices={indices}
        onUploadDocument={handleUploadDocument}
      />
    </div>
  );
}
