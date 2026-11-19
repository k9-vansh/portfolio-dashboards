import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignUp as ClerkSignUpForm } from '@clerk/nextjs';
import { Metadata } from 'next';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { InteractiveGridPattern } from './interactive-grid';
import { GuestModeButton } from './guest-mode-button';

export const metadata: Metadata = {
  title: 'Sign Up | AgentOps',
  description: 'Create an account to manage autonomous AI agent fleet telemetry or enter as guest.'
};

export default function SignUpViewPage() {
  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='https://github.com/k9-vansh/portfolio-dashboards'
        target='_blank'
        rel='noreferrer'
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'absolute top-4 right-4 z-30 gap-2 font-mono text-xs md:top-8 md:right-8'
        )}
      >
        <Icons.github className='size-4' />
        <span>k9-vansh/portfolio-dashboards</span>
      </Link>

      {/* Left hero display */}
      <div className='relative hidden h-full flex-col justify-between p-10 lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-sidebar/80 backdrop-blur-sm' />

        {/* Top Header */}
        <div className='text-sidebar-foreground relative z-20 flex items-center gap-3 text-lg font-semibold tracking-tight'>
          <div className='flex size-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary'>
            <Icons.sparkles className='size-5' />
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <span className='font-bold'>AgentOps</span>
              <span className='rounded border border-primary/20 bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary'>
                v2.4
              </span>
            </div>
            <p className='text-muted-foreground text-xs font-normal'>
              Autonomous Fleet & Cost Telemetry
            </p>
          </div>
        </div>

        {/* Centerpiece highlights */}
        <div className='relative z-20 my-auto max-w-lg space-y-6'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight text-foreground'>
              Enterprise Observability for Autonomous AI Fleets.
            </h2>
            <p className='mt-2 text-sm text-muted-foreground leading-relaxed'>
              Real-time token burn telemetry, sub-150ms inference latency budgets, multi-model
              routing, and deterministic agent orchestration.
            </p>
          </div>

          <div className='grid grid-cols-2 gap-3 font-mono text-xs'>
            <div className='rounded-lg border border-border/80 bg-card/60 p-3'>
              <div className='text-muted-foreground text-[11px]'>Monthly Tokens Streamed</div>
              <div className='mt-1 text-xl font-semibold tracking-tight text-foreground'>
                148.6M
              </div>
              <div className='mt-0.5 text-[10px] text-emerald-400'>+24.8% vs last month</div>
            </div>
            <div className='rounded-lg border border-border/80 bg-card/60 p-3'>
              <div className='text-muted-foreground text-[11px]'>Avg Response Latency</div>
              <div className='mt-1 text-xl font-semibold tracking-tight text-foreground'>142ms</div>
              <div className='mt-0.5 text-[10px] text-emerald-400'>Sub-150ms budget Met</div>
            </div>
          </div>
        </div>

        <InteractiveGridPattern
          className={cn(
            'mask-[radial-gradient(450px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[0%] h-full skew-y-12 opacity-60'
          )}
        />

        {/* Footer quote */}
        <div className='text-sidebar-foreground relative z-20 mt-auto'>
          <blockquote className='space-y-2 border-l-2 border-primary/40 pl-4'>
            <p className='text-sm text-muted-foreground leading-relaxed italic'>
              &ldquo;Modern AI agents need the same level of deterministic telemetry, budget
              controls, and health monitoring as critical microservices.&rdquo;
            </p>
            <footer className='text-sidebar-foreground/80 font-mono text-xs'>
              AgentOps Platform Architecture · Portfolio Showcase
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right sign-up / guest access container */}
      <div className='flex h-full w-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          {/* Guest Access Button */}
          <GuestModeButton />

          {/* Divider */}
          <div className='relative flex w-full items-center justify-center'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-dashed border-border' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-3 font-mono text-[11px] text-muted-foreground'>
                Or create a Clerk account
              </span>
            </div>
          </div>

          {/* Clerk Form */}
          <div className='w-full'>
            <ClerkSignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
