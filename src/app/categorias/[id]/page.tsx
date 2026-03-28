import { Card } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { getCategoriaById } from '@/services/categorias/categorias.services';
import CategoriaForm from '../(form)/CategoriaForm';
import { updateCategoria } from '../actions';
import { FormValues } from '../(form)/schema';

export default async function EditCategoria({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categoria = await getCategoriaById(id);

  if (!categoria) notFound();

  async function action(data: FormValues) {
    'use server';
    return updateCategoria(id, data);
  }

  return (
    <div className='flex items-center flex-col gap-2'>
      <Card className='p-5 max-w-2xl w-full'>
        <h1 className='text-xl font-bold mb-4'>Editar Categoría</h1>
        <CategoriaForm defaultValues={{ nombre: categoria.nombre }} onSubmit={action} />
      </Card>
    </div>
  );
}
