export const dynamic = 'force-dynamic';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mapIcon } from '@/lib/icons';
import { getCategorias } from '@/services/categorias/categorias.services';
import Link from 'next/link';
import { Suspense } from 'react';

export default function CategoriasPage() {
  return (
    <div>
      <div className='flex justify-between items-center mb-5'>
        <h1 className='text-2xl font-bold'>Categorías</h1>
        <Button asChild>
          <Link href='/categorias/create'>Nueva categoría</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Fecha de creación</TableHead>
            <TableHead className='text-right'>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <Suspense fallback={<CategoriasListSkeleton />}>
          <CategoriasList />
        </Suspense>
      </Table>
    </div>
  );
}
async function CategoriasList() {
  const categorias = await getCategorias();

  return (
    <TableBody>
      {categorias.map((cat) => (
        <TableRow key={cat.idCategoria}>
          <TableCell>
            <div className='flex items-center gap-2 font-medium'>
              {(() => {
                const Icon = mapIcon(cat.icon);
                return <Icon className='size-4 shrink-0' />;
              })()}
              {cat.nombre}
            </div>
          </TableCell>
          <TableCell className='text-muted-foreground'>{new Date(cat.createdAt).toLocaleDateString('es')}</TableCell>
          <TableCell className='text-right'>
            <Button asChild variant='outline' size='sm'>
              <Link href={`/categorias/${cat.idCategoria}`}>Editar</Link>
            </Button>
          </TableCell>
        </TableRow>
      ))}
      {categorias.length === 0 && (
        <TableRow>
          <TableCell colSpan={3} className='text-center text-muted-foreground py-6'>
            Sin categorías registradas.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

function CategoriasListSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 4 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className='h-4 w-32' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-24' />
          </TableCell>
          <TableCell className='text-right'>
            <Skeleton className='h-8 w-16 ml-auto' />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
