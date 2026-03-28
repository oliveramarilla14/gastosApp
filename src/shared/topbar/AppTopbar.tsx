'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';

const user = {
  name: 'Oliver Amarilla',
  username: 'oliver.amarilla'
};

export default function AppTopbar() {
  const initials = user.name
    .split(' ')
    .filter((_, index) => index < 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className='w-full h-16 flex items-center justify-between px-4'>
      <SidebarTrigger />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-accent transition-colors outline-none'>
            <div className='text-right'>
              <p className='text-sm font-medium leading-none'>{user.name}</p>
              <p className='text-xs text-muted-foreground mt-0.5'>@{user.username}</p>
            </div>
            <Avatar className='h-8 w-8'>
              <AvatarFallback className='text-xs'>{initials}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-40'>
          <DropdownMenuItem className='text-destructive focus:text-destructive cursor-pointer'>
            <LogOut className='mr-2 h-4 w-4' />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
