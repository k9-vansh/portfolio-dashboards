'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport
} from '@/components/ui/message-scroller';
import { Message, MessageAvatar, MessageContent } from '@/components/ui/message';
import { Bubble, BubbleContent } from '@/components/ui/bubble';
import { Marker, MarkerContent, MarkerIcon } from '@/components/ui/marker';
import { chatTransport, demoChat, initialMessages, type DemoUIMessage } from '../chat';

type ToolPart = {
  type: string;
  toolName?: string;
  state: 'input-streaming' | 'input-available' | 'output-available' | 'output-error';
  input?: unknown;
  output?: unknown;
  errorText?: string;
};

function ToolMarker({ part }: { part: ToolPart }) {
  const name = part.toolName ?? part.type.replace(/^tool-/, '');
  const running = part.state === 'input-streaming' || part.state === 'input-available';
  const done = part.state === 'output-available';
  const errored = part.state === 'output-error';

  return (
    <div className='flex flex-col gap-1.5'>
      <Marker>
        <MarkerIcon>
          <Icons.code />
        </MarkerIcon>
        {running ? (
          <MarkerContent className='shimmer'>Running {name}…</MarkerContent>
        ) : (
          <MarkerContent>
            {errored ? 'Failed' : 'Called'}{' '}
            <span className='text-foreground font-medium'>{name}</span>
          </MarkerContent>
        )}
      </Marker>
      {done && part.output != null && (
        <Bubble variant='outline'>
          <BubbleContent>
            <pre className='overflow-x-auto font-mono text-xs'>
              {JSON.stringify(part.output, null, 2)}
            </pre>
          </BubbleContent>
        </Bubble>
      )}
      {errored && part.errorText && <p className='text-destructive text-sm'>{part.errorText}</p>}
    </div>
  );
}

const SUGGESTED_PROMPTS = [
  'Run telemetry diagnostic across model fleet',
  'Which agent fleets have elevated error rates?',
  'Audit prompt caching & token savings'
];

export function AiChatDemo() {
  const { messages, sendMessage, status, setMessages } = useChat<DemoUIMessage>({
    messages: initialMessages,
    transport: chatTransport
  });

  const [input, setInput] = useState('');
  const nextMessage = demoChat.next(messages);
  const isBusy = status === 'submitted' || status === 'streaming';

  const handleCustomSend = (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isBusy) return;

    if (nextMessage) {
      void sendMessage(nextMessage);
      setInput('');
      return;
    }

    // Interactive fallback for dynamic queries
    const userMsg: DemoUIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      parts: [{ type: 'text', text: textToSend }]
    };

    const assistMsg: DemoUIMessage = {
      id: `asst-${Date.now()}`,
      role: 'assistant',
      parts: [
        {
          type: 'reasoning',
          text: `Analyzing active cluster telemetry and provider routing logs for: "${textToSend}"`
        },
        {
          type: 'dynamic-tool',
          toolName: 'queryTelemetry',
          toolCallId: `call-${Date.now()}`,
          input: { metric: 'telemetry', timeRange: '24h' },
          state: 'output-available',
          output: {
            target: textToSend,
            cluster: 'us-east-prod-cluster',
            activeInstances: 36,
            avgLatency: '142ms',
            status: '100% operational',
            routingRecommendation: 'Optimal'
          }
        },
        {
          type: 'text',
          text: `Telemetry audit executed. The 36 active worker agent instances are operating within nominal thresholds (142ms P50 latency, zero memory leaks, and $412 in prompt cache savings recorded today). No intervention required.`
        }
      ]
    };

    setMessages([...messages, userMsg, assistMsg]);
    setInput('');
  };

  return (
    <div className='relative flex flex-1'>
      <div className='bg-card absolute inset-0 mx-auto flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border'>
        <div className='flex shrink-0 items-center gap-2 border-b px-4 py-3'>
          <div className='bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg'>
            <Icons.sparkles className='size-4' />
          </div>
          <div className='min-w-0'>
            <p className='text-sm font-semibold'>AgentOps Copilot</p>
            <p className='text-muted-foreground text-xs'>
              Autonomous Fleet Diagnostics · Tool-Calling Agent
            </p>
          </div>
          <Badge variant='outline' className='ml-auto capitalize text-xs font-mono'>
            {isBusy ? 'Processing' : status}
          </Badge>
        </div>

        <MessageScrollerProvider defaultScrollPosition='end' scrollPreviousItemPeek={64}>
          <MessageScroller className='min-h-0 flex-1'>
            <MessageScrollerViewport>
              <MessageScrollerContent className='px-4 py-4'>
                {messages.length === 0 ? (
                  <div className='text-muted-foreground flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center text-sm'>
                    <div className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full'>
                      <Icons.sparkles className='size-6' />
                    </div>
                    <div>
                      <p className='font-semibold text-foreground text-base'>
                        AgentOps Fleet Assistant
                      </p>
                      <p className='text-xs mt-1'>
                        Ask questions or trigger live telemetry tool calls below.
                      </p>
                    </div>
                    <div className='flex flex-wrap justify-center gap-1.5 mt-2 max-w-md'>
                      {SUGGESTED_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handleCustomSend(prompt)}
                          className='text-xs bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground px-2.5 py-1 rounded-full border transition-colors'
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((message) => {
                    const isUser = message.role === 'user';
                    return (
                      <MessageScrollerItem
                        key={message.id}
                        messageId={message.id}
                        scrollAnchor={isUser}
                      >
                        <Message align={isUser ? 'end' : 'start'}>
                          <MessageAvatar
                            className={cn(
                              'size-8 self-start',
                              isUser
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-primary/10 text-primary'
                            )}
                          >
                            {isUser ? (
                              <Icons.user className='size-4' />
                            ) : (
                              <Icons.sparkles className='size-4' />
                            )}
                          </MessageAvatar>
                          <MessageContent>
                            {message.parts.map((part, i) => {
                              const key = `${message.id}-${i}`;
                              if (part.type === 'text') {
                                return (
                                  <Bubble
                                    key={key}
                                    variant={isUser ? 'default' : 'muted'}
                                    align={isUser ? 'end' : 'start'}
                                  >
                                    <BubbleContent className='whitespace-pre-wrap text-sm'>
                                      {part.text}
                                    </BubbleContent>
                                  </Bubble>
                                );
                              }
                              if (part.type === 'reasoning') {
                                return (
                                  <Marker key={key}>
                                    <MarkerIcon>
                                      <Icons.sparkles />
                                    </MarkerIcon>
                                    <MarkerContent className='italic text-xs text-muted-foreground'>
                                      {part.text}
                                    </MarkerContent>
                                  </Marker>
                                );
                              }
                              if (part.type === 'dynamic-tool' || part.type.startsWith('tool-')) {
                                return <ToolMarker key={key} part={part as unknown as ToolPart} />;
                              }
                              return null;
                            })}
                          </MessageContent>
                        </Message>
                      </MessageScrollerItem>
                    );
                  })
                )}

                {status === 'submitted' && (
                  <MessageScrollerItem messageId='pending'>
                    <Message align='start'>
                      <MessageAvatar className='bg-primary/10 text-primary size-8 self-start'>
                        <Icons.sparkles className='size-4' />
                      </MessageAvatar>
                      <MessageContent>
                        <Marker>
                          <MarkerContent className='shimmer'>
                            Querying fleet telemetry…
                          </MarkerContent>
                        </Marker>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                )}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>

        <div className='flex flex-col gap-2 border-t p-3 bg-card'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCustomSend();
            }}
            className='flex items-center gap-2'
          >
            <Input
              placeholder={
                nextMessage
                  ? 'Type a question or press Send next message...'
                  : 'Ask AgentOps copilot anything...'
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isBusy}
              className='text-sm h-9'
            />
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() => setMessages(demoChat.get(0))}
              disabled={isBusy || messages.length === 0}
              className='h-9 px-3 shrink-0'
            >
              Reset
            </Button>
            <LoadingButton
              type='submit'
              size='sm'
              className='h-9 px-3 shrink-0'
              loading={isBusy}
              loadingLabel='Streaming'
            >
              {nextMessage && !input.trim() ? (
                <>
                  <Icons.send className='size-3.5 mr-1.5' /> Send next turn
                </>
              ) : (
                <>
                  <Icons.send className='size-3.5 mr-1.5' /> Send
                </>
              )}
            </LoadingButton>
          </form>
        </div>
      </div>
    </div>
  );
}
