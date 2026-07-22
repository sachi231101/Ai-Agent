import React, { useState } from 'react';
import { Plug, RefreshCw, CheckCircle2, Globe, Database, HardDrive, MessageSquare, Layers, Sparkles } from 'lucide-react';
import type { DataConnectorItem } from '../types';

const INITIAL_CONNECTORS: DataConnectorItem[] = [
  {
    id: 'conn-1',
    name: 'Notion Workspace Sync',
    provider: 'Notion',
    description: 'Auto-sync engineering docs, product specs, and wiki pages into vector embeddings.',
    status: 'connected',
    syncedDocs: 142,
    lastSync: '10 mins ago',
    category: 'Workspace',
  },
  {
    id: 'conn-2',
    name: 'Google Drive Connector',
    provider: 'Google Drive',
    description: 'Ingest PDF reports, spreadsheets, and shared docs into vector index stores.',
    status: 'connected',
    syncedDocs: 85,
    lastSync: '1 hour ago',
    category: 'Cloud Storage',
  },
  {
    id: 'conn-3',
    name: 'Confluence Cloud Wiki',
    provider: 'Confluence',
    description: 'Sync Atlassian Confluence space pages and technical architecture RFCs.',
    status: 'disconnected',
    syncedDocs: 0,
    lastSync: 'Never',
    category: 'Workspace',
  },
  {
    id: 'conn-4',
    name: 'PostgreSQL Read Replica',
    provider: 'PostgreSQL',
    description: 'Stream relational table text columns into pgvector embeddings via CDC hooks.',
    status: 'connected',
    syncedDocs: 340,
    lastSync: '2 hours ago',
    category: 'Database',
  },
  {
    id: 'conn-5',
    name: 'Slack Support Channels',
    provider: 'Slack',
    description: 'Index solved support thread conversations and internal Q&A exchanges.',
    status: 'disconnected',
    syncedDocs: 0,
    lastSync: 'Never',
    category: 'Messaging',
  },
  {
    id: 'conn-6',
    name: 'AWS S3 Document Bucket',
    provider: 'AWS S3',
    description: 'Auto-trigger vector ingestion pipeline on file put events in S3 bucket.',
    status: 'disconnected',
    syncedDocs: 0,
    lastSync: 'Never',
    category: 'Cloud Storage',
  },
];

export function DataConnectorsGrid() {
  const [connectors, setConnectors] = useState<DataConnectorItem[]>(INITIAL_CONNECTORS);

  const toggleConnection = (id: string) => {
    setConnectors((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const isConn = c.status === 'connected';
        return {
          ...c,
          status: isConn ? 'disconnected' : 'connected',
          syncedDocs: isConn ? 0 : 25,
          lastSync: isConn ? 'Never' : 'Just now',
        };
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div>
          <h3 className="text-base font-bold text-foreground">Enterprise Data Connectors</h3>
          <p className="text-xs text-muted-foreground">
            Connect live data sources to automatically sync and re-index updated documents.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {connectors.map((connector) => {
          const isConnected = connector.status === 'connected';
          return (
            <div
              key={connector.id}
              className="p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/50 transition-all shadow-sm flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-[10px] font-semibold uppercase tracking-wide">
                    {connector.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                      isConnected
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
                    {connector.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-foreground">{connector.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                  {connector.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs">
                <div className="text-[11px] text-muted-foreground">
                  <span>Synced Docs: </span>
                  <span className="font-semibold text-foreground">{connector.syncedDocs}</span>
                </div>

                <button
                  onClick={() => toggleConnection(connector.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    isConnected
                      ? 'bg-card hover:bg-red-500/10 hover:text-red-500 border-border/60 text-foreground'
                      : 'bg-primary text-primary-foreground border-primary shadow-sm hover:opacity-90'
                  }`}
                >
                  {isConnected ? 'Disconnect' : 'Connect Source'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
