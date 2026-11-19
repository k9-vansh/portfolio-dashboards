'use client';

import PageContainer from '@/components/layout/page-container';
import { OrganizationList, useUser } from '@clerk/nextjs';
import { workspacesInfoContent } from '@/config/infoconfig';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Link from 'next/link';

export default function WorkspacesView() {
  const { user, isLoaded } = useUser();

  return (
    <PageContainer
      pageTitle='Workspaces'
      pageDescription='Manage your workspaces and switch between them'
      infoContent={workspacesInfoContent}
    >
      {isLoaded && !user ? (
        <div className='max-w-2xl space-y-4'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='flex size-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary'>
                    <Icons.sparkles className='size-5' />
                  </div>
                  <div>
                    <CardTitle className='text-base'>AgentOps Cloud · Demo Fleet</CardTitle>
                    <CardDescription>Default Sandbox Organization</CardDescription>
                  </div>
                </div>
                <Badge
                  variant='outline'
                  className='border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs'
                >
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-3 text-sm'>
              <p className='text-muted-foreground text-xs'>
                In guest demo mode, all fleet metrics, models, and copilot actions are routed to the
                shared <strong>AgentOps Cloud</strong> workspace.
              </p>
              <div className='rounded-lg border border-dashed p-3 flex items-center justify-between bg-muted/20'>
                <span className='text-xs text-muted-foreground'>
                  Need multi-tenant team management?
                </span>
                <Link href='/auth/sign-in'>
                  <Button size='sm' variant='outline' className='h-7 text-xs gap-1.5'>
                    <Icons.login className='size-3' />
                    Sign In to Create Orgs
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <OrganizationList
          appearance={{
            elements: {
              organizationListBox: 'space-y-2',
              organizationPreview: 'rounded-lg border p-4 hover:bg-accent',
              organizationPreviewMainIdentifier: 'text-lg font-semibold',
              organizationPreviewSecondaryIdentifier: 'text-sm text-muted-foreground'
            }
          }}
          afterSelectOrganizationUrl='/dashboard/workspaces/team'
          afterCreateOrganizationUrl='/dashboard/workspaces/team'
        />
      )}
    </PageContainer>
  );
}
