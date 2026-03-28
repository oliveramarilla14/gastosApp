import './globals.css';
import { Figtree } from 'next/font/google';
import { cn } from '@/lib/utils';
import Provider from '@/core/Provider';
import AppSidebar from '@/shared/sidebar/AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es' className={cn('antialiased', 'font-sans', figtree.variable, 'dark')}>
      <body className='min-h-full'>
        <Provider>
          <AppSidebar />
          <SidebarTrigger />
          <main className='w-full px-5 mt-8'>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
