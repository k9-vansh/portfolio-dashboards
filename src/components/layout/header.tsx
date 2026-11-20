import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { ThemeSelector } from '../themes/theme-selector';
import { ThemeModeToggle } from '../themes/theme-mode-toggle';
import CtaGithub from './cta-github';
import { SidebarToggle } from './sidebar-toggle';
import { NotificationCenter } from '@/features/notifications/components/notification-center';
import { GuestHeaderBadge } from './guest-header-badge';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='flex h-14 shrink-0 items-center gap-3 border-b px-3 md:px-4'>
      <div className='flex min-w-0 flex-1 items-center'>
        <SidebarToggle />
        <Separator
          orientation='vertical'
          className='mr-3 ml-1.5 data-vertical:h-4 data-vertical:self-center'
        />
        <Breadcrumbs />
      </div>

      <div className='flex shrink-0 items-center gap-1.5'>
        <Link
          href='mailto:k9.vansh@gmail.com?subject=Inquiry%20about%20AgentOps%20Enterprise%20Telemetry'
          target='_blank'
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'hidden xl:inline-flex h-8 gap-1.5 px-2.5 font-mono text-xs border-primary/20 bg-primary/5 hover:bg-primary/10 text-foreground'
          )}
          title='Inquire for custom enterprise deployment or client licensing'
        >
          <Icons.sparkles className='size-3 text-emerald-400' />
          <span>Custom Build Inquiry</span>
        </Link>
        <GuestHeaderBadge />
        <SearchInput />
        <CtaGithub />
        <ThemeModeToggle />
        <div className='hidden sm:block'>
          <ThemeSelector />
        </div>
        <NotificationCenter />
      </div>
    </header>
  );
}
