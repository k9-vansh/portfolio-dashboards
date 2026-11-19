'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export function GuestHeaderBadge() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // If clerk is still loading or user is logged in, do not render guest banner
  if (!isLoaded || user) {
    return null;
  }

  const handleExitGuest = async () => {
    try {
      await fetch('/api/auth/guest', { method: 'DELETE' });
    } catch {
      // ignore
    }
    router.push('/auth/sign-in');
    router.refresh();
  };

  return (
    <div className='flex items-center gap-2 pr-1'>
      <Badge
        variant='outline'
        className='hidden items-center gap-1.5 border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-400 sm:inline-flex'
      >
        <span className='relative flex size-1.5'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
          <span className='relative inline-flex size-1.5 rounded-full bg-emerald-500' />
        </span>
        Demo Mode
      </Badge>

      <Button
        variant='ghost'
        size='sm'
        onClick={handleExitGuest}
        className='h-7 gap-1 px-2 font-mono text-xs text-muted-foreground hover:text-foreground'
        title='Exit demo mode and sign in'
      >
        <Icons.login className='size-3.5' />
        <span className='hidden sm:inline'>Sign In</span>
      </Button>
    </div>
  );
}
