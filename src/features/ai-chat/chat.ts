import { createChat } from '@shadcn/helpers/ai-sdk';
import type { UIMessage } from 'ai';

type Tools = {
  queryTelemetry: {
    input: { metric: string; timeRange: string };
    output: {
      tokensProcessed: string;
      avgLatency: string;
      topModel: string;
      costSavings: string;
    };
  };
  auditAgentFleets: {
    input: { cluster: string };
    output: {
      activeFleets: number;
      healthyNodes: number;
      p99Latency: string;
      errorRate: string;
    };
  };
};

/** The message shape for this demo (typed tools, no data parts). */
export type DemoUIMessage = UIMessage<unknown, Record<string, never>, Tools>;

/**
 * A scripted AI conversation for AgentOps fleet telemetry.
 * It streams through the real `useChat` lifecycle via `transport()` —
 * showing off reasoning, tool calls, and streamed text across multiple turns.
 */
export const demoChat = createChat<DemoUIMessage>()
  .user(
    'Run a telemetry diagnostic across our deployed model fleet. What is our latency and token spend looking like?'
  )
  .sleep(500)
  .assistant(({ writer }) => {
    writer.reasoning(
      'Analyzing cluster telemetry metrics for the last 24h across all deployed inference endpoints and prompt cache layers.'
    );
    writer
      .tool('queryTelemetry', {
        title: 'Querying cluster telemetry metrics',
        input: { metric: 'throughput-latency', timeRange: 'last-24h' }
      })
      .sleep(900)
      .output({
        tokensProcessed: '4.8M tokens today (148.6M MTD)',
        avgLatency: '142ms (P95: 210ms)',
        topModel: 'Claude 3.7 Sonnet (38% volume)',
        costSavings: '$412 saved via prompt caching'
      });
    writer.text(
      'Telemetry diagnostics complete. Over the last 24 hours, the fleet streamed **4.8M tokens** with an average inference latency of **142ms** (down 18.4% from yesterday). Claude 3.7 Sonnet handled 38% of reasoning tasks, while Gemini 2.5 Flash drove high-throughput vector extraction. Prompt caching saved **$412** across repetitive system instructions.'
    );
  })
  .user('Which agent fleets are showing the highest error rate, and how do we optimize them?')
  .sleep(500)
  .assistant(({ writer }) => {
    writer.reasoning(
      'Checking node health and error logs across the 36 active worker agent instances in the US-East production cluster.'
    );
    writer
      .tool('auditAgentFleets', {
        title: 'Auditing 36 active agent instances',
        input: { cluster: 'us-east-prod-cluster' }
      })
      .sleep(850)
      .output({
        activeFleets: 36,
        healthyNodes: 36,
        p99Latency: '380ms',
        errorRate: '0.06%'
      });
    writer.text(
      'All 36 agent fleets are healthy with an aggregate error rate of only **0.06%**. The minor errors were transient rate-limit retries on CodeGen Agent #04 during peak merge hours. I recommend enabling **speculative fallback routing** to Gemini 2.5 Flash when Claude API experiences elevated queue times.'
    );
  });

/** Empty initial transcript — the demo streams as the user presses Send. */
export const initialMessages = demoChat.get(0);

/** Local transport that streams the scripted responses through `useChat`. */
export const chatTransport = demoChat.transport({ delayMs: 25 });
