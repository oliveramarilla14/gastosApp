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
  if (/^\/gasto\/[^/]+/.test(pathname)) return [{ name: 'Gastos', url: '/gasto' }, { name: 'Detalle' }];
  if (pathname === '/categorias') return [{ name: 'Categorías' }];
  if (pathname === '/categorias/create') return [{ name: 'Categorías', url: '/categorias' }, { name: 'Nueva categoría' }];
  if (/^\/categorias\/[^/]+/.test(pathname)) return [{ name: 'Categorías', url: '/categorias' }, { name: 'Editar categoría' }];
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
