import { Card } from '@/components/ui/card';
import { getCategorias } from '@/services/categorias/categorias.services';
import MothSpentForm from '../(form)/MothSpentForm';
import { createGasto } from '../actions';

export default async function Create() {
  const categorias = await getCategorias();

  return (
    <div className='flex items-center flex-col gap-2'>
      <Card className='p-5 max-w-2xl w-full'>
        <MothSpentForm
          onSubmit={createGasto}
          categorias={categorias.map((c) => ({ id: c.idCategoria, name: c.nombre }))}
        />
      </Card>
    </div>
  );
}
