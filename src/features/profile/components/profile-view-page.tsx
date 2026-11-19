'use client';

import { UserProfile, useUser } from '@clerk/nextjs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Link from 'next/link';

export default function ProfileViewPage() {
  const { user, isLoaded } = useUser();

  if (isLoaded && !user) {
    return (
      <div className='flex w-full flex-col gap-6 p-4 max-w-4xl'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Operator Profile</h2>
          <p className='text-muted-foreground text-sm'>
            Session and permission attributes for the active fleet environment.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='flex size-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 font-mono text-base font-bold text-emerald-400'>
                  GO
                </div>
                <div>
                  <CardTitle className='text-lg'>Guest Operator</CardTitle>
                  <CardDescription>
                    guest.preview@agentops.ai · Ephemeral Fleet Sandbox
                  </CardDescription>
                </div>
              </div>
              <Badge
                variant='outline'
                className='border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs'
              >
                Demo Mode
              </Badge>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-sm'>
              <div className='rounded-lg border p-3 bg-muted/30'>
                <div className='text-muted-foreground text-xs font-mono uppercase'>
                  Assigned Role
                </div>
                <div className='font-medium mt-1'>Fleet Telemetry Auditor (Read/Simulate)</div>
              </div>
              <div className='rounded-lg border p-3 bg-muted/30'>
                <div className='text-muted-foreground text-xs font-mono uppercase'>
                  Session Status
                </div>
                <div className='font-medium mt-1 text-emerald-400 flex items-center gap-1.5'>
                  <span className='size-2 rounded-full bg-emerald-500 animate-pulse' />
                  Active Sandbox Access
                </div>
              </div>
            </div>

            <div className='rounded-lg border border-dashed p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-accent/20'>
              <div>
                <h4 className='text-sm font-semibold'>
                  Want to save custom fleet channels & team keys?
                </h4>
                <p className='text-xs text-muted-foreground'>
                  Sign in or create an authenticated account via Clerk to persist configurations.
                </p>
              </div>
              <Link href='/auth/sign-in'>
                <Button size='sm' className='gap-1.5'>
                  <Icons.login className='size-3.5' />
                  Sign In with Clerk
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col p-4'>
      <UserProfile />
    </div>
  );
}
