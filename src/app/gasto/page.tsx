export const dynamic = 'force-dynamic';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { GastoType } from '@/entites/types/gasto.type';
import { mapIcon } from '@/lib/icons';
import { formatoMoneda } from '@/lib/numbers';
import { cn } from '@/lib/utils';
import { getGastos } from '@/services/gastos/gastos.services';
import { CalendarX } from 'lucide-react';
import Link from 'next/link';

function getProgress(gasto: GastoType): number {
  if (gasto.tipoGasto === 'PRESTAMO' && gasto.cuotasAbonadas != null && gasto.totalCuotas)
    return (gasto.cuotasAbonadas / gasto.totalCuotas) * 100;
  if (gasto.tipoGasto === 'TARJETA' && gasto.montoTotal > 0) return (gasto.montoAbonado / gasto.montoTotal) * 100;
  return 100;
}

function getProgressLabel(gasto: GastoType): string {
  if (gasto.tipoGasto === 'PRESTAMO') return `${gasto.cuotasAbonadas ?? 0}/${gasto.totalCuotas ?? 0} cuotas`;
  if (gasto.tipoGasto === 'TARJETA')
    return `${formatoMoneda.format(gasto.montoAbonado)} / ${formatoMoneda.format(gasto.montoTotal)}`;
  return 'Recurrente';
}

export default async function Gasto() {
  const gastos = await getGastos();
  console.log('gastos', gastos);

  return (
    <main>
      <div className='flex justify-between'>
        Mis gastos
        <Link href='/gasto/create' className='ml-4 text-sm text-blue-600 hover:underline'>
          Nuevo gasto
        </Link>
      </div>

      <div className='flex gap-5 mt-5 flex-wrap'>
        {gastos.map((gasto) => {
          const Icon = mapIcon(gasto.icon);
          const progress = getProgress(gasto);
          return (
            <Card className={cn('min-w-72', gasto.finalizado && 'opacity-50')} key={gasto.idGasto}>
              <CardHeader>
                <CardTitle>{gasto.concepto}</CardTitle>
                <CardDescription>{gasto.categoria}</CardDescription>
                <CardAction>
                  <Icon size={20} />
                </CardAction>
              </CardHeader>
              <CardContent>
                <Badge className='mb-2'>{formatoMoneda.format(gasto.montoDeuda)}</Badge>
                {gasto.finalizado && (
                  <Badge variant='ghost' className='bg-green-600 ml-2'>
                    Finalizado
                  </Badge>
                )}

                <Progress value={progress} className='w-full'>
                  <ProgressLabel>{getProgressLabel(gasto)}</ProgressLabel>
                  <ProgressValue />
                </Progress>
                {gasto.fechaFinalizacion ? (
                  <p className='flex gap-2 items-center text-sm text-muted-foreground mt-2'>
                    <CalendarX size={14} />{' '}
                    {new Date(gasto.fechaFinalizacion).toLocaleDateString('es-PY', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </p>
                ) : (
                  <p className='flex gap-2 items-center text-sm text-muted-foreground mt-2'>
                    <CalendarX size={14} /> Fijo
                  </p>
                )}
              </CardContent>
              <CardFooter className='flex flex-wrap gap-2'>
                <Button asChild variant='default' className='w-full'>
                  <Link href={`/gasto/${gasto.idGasto}`}>Ver</Link>
                </Button>
                <Button asChild variant='outline' className='w-full' disabled={gasto.finalizado}>
                  <Link href={`/gasto/${gasto.idGasto}/edit`}>Editar</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
