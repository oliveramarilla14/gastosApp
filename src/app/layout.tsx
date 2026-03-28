import "./globals.css";
import { Geist, Figtree } from "next/font/google";
import { cn } from "@/lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn("h-full", "antialiased", "font-sans", figtree.variable,'dark')}
    >
      <body className="min-h-full p-4 ">
          <h1 className='text-2xl font-bold text-center mb-5'>Gastos App</h1>
        {children}
        </body>
    </html>
  );
}
