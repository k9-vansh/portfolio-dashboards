'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';
import { enterGuestMode } from '@/features/auth/actions/guest-mode';

export function GuestModeButton() {
  const [isPending, startTransition] = useTransition();
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();

  const handleGuestEntry = () => {
    setIsConnecting(true);
    startTransition(async () => {
      try {
        await enterGuestMode();
      } catch {
        // Fallback to fetch API if server action redirect is handled differently on client
        try {
          await fetch('/api/auth/guest', { method: 'POST' });
          router.push('/dashboard/overview');
          router.refresh();
        } catch (e) {
          console.error('Failed to enter guest mode:', e);
          setIsConnecting(false);
        }
      }
    });
  };

  const loading = isPending || isConnecting;

  return (
    <div className='relative w-full'>
      {/* Vercel-style glowing outline background */}
      <div className='absolute -inset-0.5 rounded-xl bg-gradient-to-r from-white/20 via-white/40 to-white/10 opacity-40 blur-xs transition duration-500 group-hover:opacity-100 dark:from-white/10 dark:via-white/30 dark:to-white/5' />

      <button
        type='button'
        disabled={loading}
        onClick={handleGuestEntry}
        className='group relative flex w-full flex-col items-start gap-2.5 overflow-hidden rounded-xl border border-foreground/20 bg-card p-4 text-left shadow-sm transition-all duration-300 hover:border-foreground/50 hover:bg-accent/40 hover:shadow-md active:scale-[0.99] disabled:pointer-events-none disabled:opacity-80'
      >
        {/* Subtle top shimmer bar */}
        <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent' />

        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='flex size-6 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400'>
              <Icons.sparkles className='size-3.5' />
            </div>
            <span className='font-mono text-[11px] font-medium tracking-wider text-muted-foreground uppercase'>
              Portfolio Quick Access
            </span>
          </div>

          <div className='flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400'>
            <span className='relative flex size-1.5'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
              <span className='relative inline-flex size-1.5 rounded-full bg-emerald-500' />
            </span>
            Active Fleet
          </div>
        </div>

        <div className='flex w-full items-center justify-between pt-0.5'>
          <div>
            <div className='text-base font-semibold tracking-tight text-foreground'>
              Explore as Guest Operator
            </div>
            <p className='text-xs text-muted-foreground'>
              Instant 1-click access to telemetry, model registry & AI copilot
            </p>
          </div>

          <div className='flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-all duration-200 group-hover:border-foreground/40 group-hover:bg-foreground group-hover:text-background'>
            {loading ? (
              <Icons.spinner className='size-4 animate-spin' />
            ) : (
              <Icons.arrowRight className='size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
            )}
          </div>
        </div>

        {loading && (
          <div className='mt-1 flex w-full items-center gap-2 font-mono text-xs text-muted-foreground'>
            <Icons.spinner className='size-3 animate-spin' />
            <span>Initializing Guest Fleet Environment...</span>
          </div>
        )}
      </button>
    </div>
  );
}
