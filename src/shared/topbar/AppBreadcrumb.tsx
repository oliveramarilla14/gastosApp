'use client';

import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type BreadcrumbSegment = { name: string; url?: string };

function getBreadcrumbs(pathname: string): BreadcrumbSegment[] {
  if (pathname === '/') return [{ name: 'Inicio' }];
  if (pathname === '/gasto') return [{ name: 'Gastos' }];
  if (pathname === '/gasto/create') return [{ name: 'Gastos', url: '/gasto' }, { name: 'Nuevo gasto' }];
  if (/^\/gasto\/\d+/.test(pathname)) return [{ name: 'Gastos', url: '/gasto' }, { name: 'Detalle' }];
  return [];
}

export default function AppBreadcrumb() {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((segment, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {!isLast && segment.url ? (
                  <BreadcrumbLink asChild>
                    <Link href={segment.url}>{segment.name}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{segment.name}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
