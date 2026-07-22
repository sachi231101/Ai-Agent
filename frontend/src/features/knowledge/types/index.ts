export type VectorProvider = 'Pinecone' | 'PostgreSQL (pgvector)' | 'Qdrant' | 'Weaviate' | 'ChromaDB';
export type MetricType = 'Cosine' | 'Euclidean' | 'Dot Product';
export type EmbeddingModel = 'text-embedding-3-large' | 'text-embedding-3-small' | 'text-embedding-ada-002' | 'cohere-embed-v3';

export interface VectorIndexConfig {
  id: string;
  name: string;
  provider: VectorProvider;
  embeddingModel: EmbeddingModel;
  dimensions: number;
  metric: MetricType;
  totalVectors: number;
  documentsCount: number;
  status: 'ready' | 'indexing' | 'error';
  chunkSize: number;
  chunkOverlap: number;
  lastSynced: string;
}

export interface DocumentChunk {
  id: string;
  chunkIndex: number;
  content: string;
  tokenCount: number;
  score?: number;
}

export interface DocumentStoreItem {
  id: string;
  title: string;
  fileType: 'PDF' | 'Markdown' | 'JSON' | 'Web Page' | 'Notion Page';
  fileSize: string;
  indexId: string;
  indexName: string;
  chunksCount: number;
  uploadedAt: string;
  status: 'processed' | 'processing' | 'failed';
  chunks: DocumentChunk[];
}

export interface DataConnectorItem {
  id: string;
  name: string;
  provider: 'Notion' | 'Google Drive' | 'Confluence' | 'Slack' | 'PostgreSQL' | 'AWS S3';
  description: string;
  status: 'connected' | 'disconnected' | 'syncing';
  syncedDocs: number;
  lastSync: string;
  category: 'Cloud Storage' | 'Workspace' | 'Database' | 'Messaging';
}

export interface RAGSearchResult {
  chunkId: string;
  docTitle: string;
  score: number;
  content: string;
  indexName: string;
}
