'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { pagarGasto } from '@/app/mensual/actions';
import { formatoMoneda } from '@/lib/numbers';
import { DetalleMensual } from '@/entites/types/gasto.type';

const MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

interface Props {
  gasto: DetalleMensual;
  mes: number;
  anho: number;
}

export function PagarModal({ gasto, mes, anho }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const descripcion = `Pago ${MESES[mes]} ${anho} - ${gasto.concepto}`;

  function confirmar() {
    startTransition(async () => {
      await pagarGasto(gasto.idGasto, gasto.tipo, gasto.monto, mes, anho, descripcion);
      setOpen(false);
    });
  }

  return (
    <>
      <Button variant='outline' size='sm' onClick={() => setOpen(true)}>
        {gasto.pagado ? 'Ver Pago' : 'Pagar'}
      </Button>

      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50' onClick={() => setOpen(false)}>
          <div
            className='bg-card border rounded-xl shadow-xl p-6 w-full max-w-sm mx-4'
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className='text-lg font-semibold mb-1'>Confirmar pago</h2>
            <p className='text-sm text-muted-foreground mb-4'>{descripcion}</p>

            <div className='space-y-2 text-sm mb-6'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Concepto</span>
                <span className='font-medium'>{gasto.concepto}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Categoría</span>
                <span>{gasto.categoria}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Monto</span>
                <span className='font-semibold'>{formatoMoneda.format(gasto.monto)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Período</span>
                <span>
                  {MESES[mes]} {anho}
                </span>
              </div>
            </div>

            <div className='flex gap-2 justify-end'>
              <Button variant='ghost' onClick={() => setOpen(false)} disabled={isPending}>
                Cancelar
              </Button>
              <Button onClick={confirmar} disabled={isPending}>
                {isPending ? 'Guardando...' : 'Confirmar'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
