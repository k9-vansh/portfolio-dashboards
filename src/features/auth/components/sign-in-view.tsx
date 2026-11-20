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
  description:
    'Commercial AI Agent telemetry, token observability, and model registry engineered by Vansh Kumar.'
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

      {/* Top action links */}
      <div className='absolute top-4 right-4 z-30 flex items-center gap-2 md:top-8 md:right-8'>
        <Link
          href='mailto:k9.vansh@gmail.com?subject=Inquiry%20about%20AgentOps%20Enterprise%20Telemetry'
          target='_blank'
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'gap-1.5 font-mono text-xs border-primary/20 bg-primary/5 hover:bg-primary/10 text-foreground'
          )}
        >
          <Icons.sparkles className='size-3 text-emerald-400' />
          <span>Inquire for Custom Build</span>
        </Link>

        <Link
          href='https://github.com/k9-vansh/portfolio-dashboards'
          target='_blank'
          rel='noreferrer'
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'hidden sm:inline-flex gap-2 font-mono text-xs text-muted-foreground hover:text-foreground'
          )}
        >
          <Icons.github className='size-4' />
          <span>k9-vansh</span>
        </Link>
      </div>

      {/* Centered Auth Card */}
      <div className='relative z-20 flex w-full max-w-md flex-col items-center justify-center space-y-6'>
        {/* Brand Header */}
        <div className='flex flex-col items-center text-center space-y-2'>
          <div className='flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-xs'>
            <Icons.sparkles className='size-6 text-emerald-400' />
          </div>
          <div>
            <div className='flex items-center justify-center gap-2'>
              <h1 className='text-2xl font-bold tracking-tight text-foreground'>AgentOps Cloud</h1>
              <span className='rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400'>
                Commercial Suite
              </span>
            </div>
            <p className='text-xs text-muted-foreground mt-1'>
              Enterprise AI Fleet Telemetry &amp; Token Cost Observability
            </p>
            <p className='text-[11px] font-mono text-muted-foreground/80 mt-1'>
              Engineered by Vansh Kumar · Turnkey Client Deployment
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
