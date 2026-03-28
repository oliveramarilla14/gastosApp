'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { version } from '../../../package.json';
import { DollarSignIcon, Home, WalletIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Route {
  name: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const routes: Route[] = [
  {
    name: 'Inicio',
    url: '/',
    icon: Home
  },
  {
    name: 'Gastos',
    url: '/gasto',
    icon: DollarSignIcon
  }
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant='floating' collapsible='icon'>
      <SidebarHeader>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
            <WalletIcon className='size-4' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-medium'>Gastos App</span>
            <span className='truncate text-xs'>Control de finanzas</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.url}>
                  <SidebarMenuButton asChild isActive={pathname === route.url} tooltip={route.name}>
                    <Link href={route.url}>
                      <route.icon />
                      <span>{route.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className='text-xs text-muted-foreground py-1'>v{version}</p>
      </SidebarFooter>
    </Sidebar>
  );
}
