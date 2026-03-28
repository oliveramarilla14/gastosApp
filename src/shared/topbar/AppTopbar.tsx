import { SidebarTrigger } from '@/components/ui/sidebar';
import AppBreadcrumb from './AppBreadcrumb';
import AppUserMenu from './AppUserMenu';

export default function AppTopbar() {
  return (
    <div className='w-full h-16 flex items-center justify-between px-4'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger />
        <AppBreadcrumb />
      </div>
      <AppUserMenu />
    </div>
  );
}
