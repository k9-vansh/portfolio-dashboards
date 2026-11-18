<h1 align="center">AgentOps — AI Fleet Telemetry &amp; Operations Platform</h1>

<div align="center">
  <strong>Production-ready AI Agent telemetry, token cost observability, model registry, and autonomous fleet orchestration.</strong>
</div>

<div align="center">
  Built with Next.js 16, React 19, shadcn/ui, Tailwind CSS v4, Vercel AI SDK, and TypeScript.
</div>

<br />

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.4.6-black?logo=nextdotjs" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/AI_SDK-Vercel-black?logo=vercel" alt="Vercel AI SDK" />
  <img src="https://img.shields.io/badge/TanStack-Query_v5-ff4154?logo=reactquery" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
</p>

---

## 🌟 Overview

**AgentOps** is an enterprise-grade observability and management platform designed for teams deploying autonomous AI agents, foundation models, and tool-calling pipelines. 

Unlike traditional static dashboard mockups, every module in this platform is built with **working, production-ready engineering patterns**:
- **Real-Time Telemetry & Metric Parallelism:** Next.js 16 parallel streaming routes (`@area_stats`, `@bar_stats`, `@pie_stats`, `@sales`) isolate slow analytical queries into independent Suspense boundaries with skeleton loaders.
- **Deep URL State Synchronization:** Data tables powered by **TanStack Table** and **`nuqs`** synchronize search, pagination, and multi-category filters directly to query parameters, creating bookmarkable views with zero client-server hydration waterfalls.
- **Interactive AI Copilot with Tool Calling:** Built on the **Vercel AI SDK**, featuring token-by-token streaming, custom tool-call execution indicators (`ToolMarker`), expandable JSON inspection drawers, and reasoning markers.
- **Agile Agent Sprint Kanban:** Accessible drag-and-drop task boards powered by **`@dnd-kit`** and **Zustand** with optimistic UI updates.
- **Vercel Monochromatic Design System:** Crafted with **Tailwind CSS v4** and **Base UI** primitives, styled in high-contrast OKLCH monochromatic dark mode.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Architectural Highlight |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router) + Turbopack** | Server Components by default, parallel routes, streaming SSR. |
| **Runtime** | **React 19 + TypeScript** | React Server Actions, `useSuspenseQuery`, strict type safety. |
| **AI Inference** | **Vercel AI SDK (`@ai-sdk/react`, `ai`)** | Tool calling, streaming message parts, token telemetry visualization. |
| **State & Cache** | **TanStack React Query v5** | Server prefetch + `HydrationBoundary` + client-side cache invalidation. |
| **URL State** | **nuqs** | Type-safe URL search params cache for zero-latency client filtering. |
| **Tables & Forms** | **TanStack Table v9 + TanStack Form + Zod** | Server-side pagination, sorting, and validated form mutations. |
| **Drag & Drop** | **`@dnd-kit/core` & `@dnd-kit/sortable`** | Touch and pointer accessible drag-and-drop with Zustand state. |
| **Visual Charts** | **Recharts** | Token throughput area charts, cost distribution bars, model traffic pies. |
| **Auth & Multi-Tenancy**| **Clerk** | Multi-tenant organization switching, team member invites, and RBAC. |
| **Styling & Tokens** | **Tailwind CSS v4 + OKLCH Tokens** | 10 themes with tweakcn, optimized dark-mode monochromatic palette. |

---

## 🚀 Key Modules & Features

### 1. Operations & Telemetry Overview (`/dashboard/overview`)
- **Executive Metric Cards:** Real-time tracking of *Total Tokens Streamed (148.6M)*, *Avg Inference Latency (142ms)*, *Compute & LLM Spend ($2,845.50)*, and *Active Agent Fleets (36 Deployed)*.
- **Token Generation Area Graph:** Monthly context volume comparing prompt token ingestion against generated completion tokens in millions.
- **Inference Spend Bar Chart:** Cost distribution contrasting hosted cloud APIs (OpenAI/Anthropic) vs. self-hosted GPU clusters.
- **Model Traffic Distribution:** Multi-model routing allocation across Claude 3.7 Sonnet, GPT-4o, Gemini 2.5, DeepSeek R1, and Llama 3.3.
- **Live Agent Telemetry Feed:** Real-time stream of autonomous agent tasks, latencies, and execution costs.

### 2. Autonomous Agent Copilot (`/dashboard/ai-chat`)
- Interactive copilot with free-form prompt input and quick-suggestion diagnostic chips.
- Visual execution status indicators (`input-streaming`, `called`, `error`, `done`) using custom `ToolMarker` and `Marker` components.
- Live structured JSON payload inspector for debugging agent tool outputs.

### 3. Model Registry & Endpoints (`/dashboard/product`)
- Registry catalog for deployed LLMs, vision engines, code synthesis models, and vector embedding services.
- Multi-column filtering by model class (`LLM Reasoning`, `Multimodal Vision`, `Code & Execution`, `Vector & Embeddings`).
- Batch actions, pagination, and slide-over sheet forms for instant configuration changes.

### 4. Agent Fleet Tasks (`/dashboard/kanban`)
- Drag-and-drop sprint board for managing AI engineering workflows, prompt caching tasks, speculative decoding benchmarks, and model evaluations.
- Priority tagging, assignees, due dates, and modal task creation.

### 5. Multi-Tenant Workspaces & RBAC (`/dashboard/workspaces`)
- Enterprise organization switcher and member management powered by Clerk.
- Dynamic client and server-side RBAC gating navigation items and API routes based on roles and permissions.

---

## 📂 Project Structure

```plaintext
src/
├── app/                           # Next.js 16 App Router routes
│   ├── auth/                      # Authentication flows (sign-in, sign-up)
│   ├── dashboard/                 # Protected dashboard route group
│   │   ├── overview/              # Telemetry dashboard with parallel routes
│   │   │   ├── @area_stats/       # Token volume streaming slot
│   │   │   ├── @bar_stats/        # Cost distribution streaming slot
│   │   │   ├── @pie_stats/        # Model traffic streaming slot
│   │   │   └── @sales/            # Live agent execution feed
│   │   ├── product/               # Model Registry (TanStack Table + nuqs)
│   │   ├── kanban/                # Agent Fleet Task Board (dnd-kit + Zustand)
│   │   ├── ai-chat/               # Interactive Agent Copilot (Vercel AI SDK)
│   │   ├── chat/                  # Fleet communications & messenger
│   │   ├── forms/                 # Multi-step wizards & sheet drawers
│   │   ├── workspaces/            # Multi-tenant organization switching
│   │   └── billing/               # Plan management & feature gating
│   └── api/                       # API route handlers
│
├── components/                    # Shared UI and layout components
│   ├── ui/                        # shadcn/ui primitives on Base UI
│   ├── layout/                    # Sidebar, header, breadcrumbs, search
│   └── themes/                    # OKLCH theme engine & switcher
│
├── features/                      # Feature-based modular architecture
│   ├── overview/                  # Metrics cards, Recharts components
│   ├── products/                  # Model catalog schemas, tables, queries
│   ├── ai-chat/                   # Tool markers, streaming transport, bubbles
│   ├── kanban/                    # Kanban columns, task cards, Zustand store
│   └── chat/                      # Split-pane messenger & composer
│
├── config/                        # Navigation configuration & RBAC rules
├── constants/                     # Mock data stores & model catalog
└── styles/                        # Global CSS & OKLCH themes
```

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js `v20.0+` (or `v24.x`)
- `pnpm` (recommended) or `npm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/k9-vansh/portfolio-dashboards.git
   cd portfolio-dashboards
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure environment variables:**
   ```bash
   cp env.example.txt .env.local
   ```
   *(Development keys for Clerk are automatically initialized with `npx clerk@latest init` or by providing your Clerk publishable & secret keys).*

4. **Launch development server:**
   ```bash
   pnpm dev
   ```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🛡️ Quality & Verification

- **Type Safety:** Strict TypeScript compilation with `pnpm typecheck` (`tsc --noEmit`).
- **Linting & Formatting:** Fast static analysis with **OxLint** and **Oxfmt**.
- **Security:** Fully patched against published advisories (running **Next.js 16.4.6**).

---

## 📄 License & Attribution

This project is open source and available under the [MIT License](LICENSE).  
Created by [k9-vansh](https://github.com/k9-vansh) • Originally based on foundations by [Kiranism](https://github.com/Kiranism).
