import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function Provider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={true}>{children}</SidebarProvider>
    </TooltipProvider>
  );
}
