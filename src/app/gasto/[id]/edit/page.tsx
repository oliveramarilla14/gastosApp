export const dynamic = 'force-dynamic';

import { Card } from '@/components/ui/card';
import { getCategorias } from '@/services/categorias/categorias.services';
import { getGastoById } from '@/services/gastos/gastos.services';
import { notFound } from 'next/navigation';
import MothSpentForm from '../../(form)/MothSpentForm';
import { updateGasto } from '../../actions';
import type { FormValues } from '../../(form)/schema';

const tipoMap: Record<string, FormValues['tipo']> = {
  FIJO: 'Fijo',
  TARJETA: 'Tarjeta',
  PRESTAMO: 'Prestamo'
};

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [gasto, categorias] = await Promise.all([getGastoById(id), getCategorias()]);

  if (!gasto) notFound();

  const defaultValues: Partial<FormValues> = {
    concepto: gasto.concepto,
    categoria: gasto.idCategoria,
    finalizado: gasto.finalizado,
    tipo: tipoMap[gasto.tipoGasto],
    monto: gasto.montoDeuda,
    diaPago: gasto.diaPago,
    montoAbonado: gasto.montoAbonado,
    montoTotal: gasto.montoTotal,
    cuotasAbonadas: gasto.cuotasAbonadas ?? 0,
    totalCuotas: gasto.totalCuotas ?? 0,
    fechaInicio: gasto.fechaInicio ? gasto.fechaInicio.slice(0, 7) : undefined
  };

  return (
    <div className='flex items-center flex-col gap-2'>
      <Card className='p-5 max-w-2xl w-full'>
        <MothSpentForm
          defaultValues={defaultValues}
          onSubmit={updateGasto.bind(null, id)}
          categorias={categorias.map((c) => ({ id: c.idCategoria, name: c.nombre }))}
        />
      </Card>
    </div>
  );
}
