import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getCategoriaById } from '@/services/categorias/categorias.services';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import CategoriaForm from '../(form)/CategoriaForm';
import { updateCategoria } from '../actions';

export default async function EditCategoria({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className='flex items-center flex-col gap-2'>
      <Card className='p-5 max-w-2xl w-full'>
        <h1 className='text-xl font-bold mb-4'>Editar Categoría</h1>
        <Suspense fallback={<EditCategoriaFormSkeleton />}>
          <EditCategoriaForm id={id} />
        </Suspense>
      </Card>
    </div>
  );
}

async function EditCategoriaForm({ id }: { id: string }) {
  const categoria = await getCategoriaById(id);

  if (!categoria) notFound();

  return (
    <CategoriaForm
      defaultValues={{ nombre: categoria.nombre, icon: categoria.icon }}
      onSubmit={updateCategoria.bind(null, id)}
    />
  );
}

function EditCategoriaFormSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton className='h-4 w-24' />
      <Skeleton className='h-10 w-full' />
      <Skeleton className='h-4 w-16' />
      <Skeleton className='h-20 w-full' />
      <Skeleton className='h-10 w-full mt-1' />
    </div>
  );
}
