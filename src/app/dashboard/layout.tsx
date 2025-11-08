'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  Bot,
  CalendarCheck2,
  Gamepad2,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  PenSquare,
  Settings,
  User,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';
import type { UserProfile } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/mood-check-in', label: 'Mood Check-In', icon: PenSquare },
  { href: '/dashboard/weekly-review', label: 'Weekly Review', icon: CalendarCheck2 },
  { href: '/dashboard/chatbot', label: 'Chatbot', icon: Bot },
  { href: '/dashboard/resources', label: 'Resources', icon: BookOpen },
  { href: '/dashboard/game', label: 'Anti-Stress Game', icon: Gamepad2 },
  { href: '/dashboard/helplines', label: 'Helplines', icon: LifeBuoy },
];

function ProfileDisplay() {
  const { state } = useSidebar();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = () => {
      // ✅ Fully safe check for client and localStorage availability
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        setIsLoading(false);
        return;
      }

      try {
        const storedState = window.localStorage?.getItem('mindbloom_state');
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          setProfile(parsedState.profile);
        }
      } catch (error) {
        console.error('Failed to load profile from localStorage', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();

    // ✅ Guard event listener for client only
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', loadProfile);
      return () => window.removeEventListener('storage', loadProfile);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div
          className={cn(
            'flex flex-col gap-1',
            state === 'collapsed' && 'opacity-0 hidden'
          )}
        >
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <Link href="/dashboard/profile">
      <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent transition-colors">
        <Avatar className="h-8 w-8">
          {profile.avatarUrl && (
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
          )}
          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div
          className={cn(
            'flex flex-col text-sm transition-opacity duration-200',
            state === 'collapsed' && 'opacity-0 hidden'
          )}
        >
          <span className="font-medium text-sidebar-foreground">
            {profile.name}
          </span>
          <span className="text-xs text-muted-foreground">View Profile</span>
        </div>
      </div>
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Safe logout handler that won’t crash during SSR
  const handleLogout = () => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      window.localStorage.removeItem('mindbloom_state');
    }
    router.push('/');
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="shrink-0" asChild>
              <Link href="/dashboard">
                <Logo className="h-6 w-6 text-primary" />
              </Link>
            </Button>
            <span className="text-lg font-semibold font-headline">MindBloom</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    pathname.startsWith(item.href) &&
                    (item.href === '/dashboard' ? pathname === item.href : true)
                  }
                  tooltip={{
                    children: item.label,
                    className: 'bg-primary text-primary-foreground',
                  }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <ProfileDisplay />
          <Separator className="my-1 bg-sidebar-border" />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/dashboard/profile'}
                tooltip={{
                  children: 'Profile',
                  className: 'bg-primary text-primary-foreground',
                }}
              >
                <Link href="/dashboard/profile">
                  <User />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/dashboard/settings'}
                tooltip={{
                  children: 'Settings',
                  className: 'bg-primary text-primary-foreground',
                }}
              >
                <Link href="/dashboard/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                tooltip={{
                  children: 'Log Out',
                  className: 'bg-primary text-primary-foreground',
                }}
              >
                <LogOut />
                <span>Log Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <main className="min-h-screen p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
