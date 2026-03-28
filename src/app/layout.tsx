import './globals.css';
import { Figtree } from 'next/font/google';
import { cn } from '@/lib/utils';
import Provider from '@/core/Provider';
import AppSidebar from '@/shared/sidebar/AppSidebar';
import AppTopbar from '@/shared/topbar/AppTopbar';

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
          <div className='w-full'>
            <AppTopbar />
            <main className='w-full px-5'>{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
