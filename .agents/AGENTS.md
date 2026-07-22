# Vibe Agent - AI Agent Builder Platform

## Core Purpose & Domain Context
- **Application Scope**: Autonomous AI Agent Builder & Workflow Builder Application.
- **Brand Name**: Vibe Agent (never use "Lovable").
- **Target Audience**: Developers, prompt engineers, and creators building AI agents, multi-agent workflows, tool integrations, and AI-driven web apps.

## Key System Architecture & Navigation Rules
1. **Post-Auth Entry Point**:
   - Following Login or Sign Up (or for authenticated users accessing public pages), the user MUST land directly on the **Dashboard** (`/dashboard`).
2. **Core Capabilities & Modules**:
   - **Dashboard (`/dashboard`)**: Central hub for starting new AI Agent builds via natural language prompts, managing existing agent projects, searching workspace assets, managing integrations/connectors, and filtering project states.
   - **AI Agent Studio (`/studio`)**: Interactive IDE / canvas for architecting agent specifications, prompt tuning, tool binding, and live previews.
   - **Agent Management (`/agents`)**: Directory of created AI agents, agent instances, and execution credentials.
   - **Workflows (`/workflows`)**: Multi-agent DAG execution canvas, trigger definitions, and webhooks.
   - **Blueprint & Specs (`/blueprint`)**: Deep agent architectural specs and tool declarations.
   - **Knowledge Base (`/knowledge`)**: RAG document stores, vector index configurations, and enterprise data connectors.
   - **Marketplace & Templates (`/marketplace`, `/templates`)**: Pre-built AI agent templates and community extensions.
