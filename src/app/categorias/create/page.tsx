import { Card } from '@/components/ui/card';
import CategoriaForm from '../(form)/CategoriaForm';
import { createCategoria } from '../actions';

export default function CreateCategoria() {
  return (
    <div className='flex items-center flex-col gap-2'>
      <Card className='p-5 max-w-2xl w-full'>
        <h1 className='text-xl font-bold mb-4'>Nueva Categoría</h1>
        <CategoriaForm onSubmit={createCategoria} />
      </Card>
    </div>
  );
}
