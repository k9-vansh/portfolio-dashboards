import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignIn as ClerkSignInForm } from '@clerk/nextjs';
import { Metadata } from 'next';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { InteractiveGridPattern } from './interactive-grid';
import { GuestModeButton } from './guest-mode-button';

export const metadata: Metadata = {
  title: 'Sign In | AgentOps',
  description: 'Enterprise AI Agent fleet telemetry, token observability, and model registry.'
};

export default function SignInViewPage() {
  return (
    <div className='relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-4 sm:p-8'>
      {/* Subtle interactive background grid */}
      <InteractiveGridPattern
        className={cn(
          'mask-[radial-gradient(550px_circle_at_center,white,transparent)]',
          'inset-0 h-full w-full opacity-40'
        )}
      />

      {/* Top right GitHub repository link */}
      <Link
        href='https://github.com/k9-vansh/portfolio-dashboards'
        target='_blank'
        rel='noreferrer'
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'absolute top-4 right-4 z-30 gap-2 font-mono text-xs md:top-8 md:right-8 text-muted-foreground hover:text-foreground'
        )}
      >
        <Icons.github className='size-4' />
        <span className='hidden sm:inline'>k9-vansh/portfolio-dashboards</span>
      </Link>

      {/* Centered Auth Card */}
      <div className='relative z-20 flex w-full max-w-md flex-col items-center justify-center space-y-6'>
        {/* Brand Header */}
        <div className='flex flex-col items-center text-center space-y-2'>
          <div className='flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-xs'>
            <Icons.sparkles className='size-6' />
          </div>
          <div>
            <h1 className='text-2xl font-bold tracking-tight text-foreground'>AgentOps Cloud</h1>
            <p className='text-xs text-muted-foreground mt-1'>
              Autonomous AI Agent Telemetry & Token Cost Observability
            </p>
          </div>
        </div>

        {/* 1-Click Guest Access */}
        <div className='w-full'>
          <GuestModeButton />
        </div>

        {/* Divider */}
        <div className='relative flex w-full items-center justify-center'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t border-border' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-3 font-mono text-[11px] text-muted-foreground'>
              Or sign in with account
            </span>
          </div>
        </div>

        {/* Clerk Sign In Form */}
        <div className='w-full'>
          <ClerkSignInForm
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'border border-border/80 bg-card shadow-sm rounded-xl',
                headerTitle: 'text-foreground font-semibold',
                headerSubtitle: 'text-muted-foreground text-xs'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
