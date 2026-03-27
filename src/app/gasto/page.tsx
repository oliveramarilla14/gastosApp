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
import { IconName, mapIcon } from '@/lib/icons';
import { formatoMoneda } from '@/lib/numbers';
import { cn } from '@/lib/utils';
import { CalendarX } from 'lucide-react';
import Link from 'next/link';

type TipoGasto = 'TARJETA' | 'PRESTAMO' | 'FIJO';

interface Gasto {
  idGasto: number;
  concepto: string;
  finalizado: boolean;
  categoria: string;
  fechaFinalizacion: string | null;
  tipoGasto: TipoGasto;
  montoAbonado: number;
  montoDeuda: number; // compromiso mensual en todos los tipos
  montoTotal: number;
  cuotasAbonadas: number | null;
  totalCuotas: number | null;
  icon: IconName;
}

const gastos: Gasto[] = [
  {
    idGasto: 1,
    tipoGasto: 'TARJETA',
    concepto: 'AMEX Itau',
    icon: 'creditCard',
    categoria: 'Tarjeta de crédito',
    montoAbonado: 1000000,
    montoDeuda: 200000,
    montoTotal: 7000000,
    cuotasAbonadas: null,
    totalCuotas: null,
    finalizado: false,
    fechaFinalizacion: null
  },
  {
    idGasto: 2,
    tipoGasto: 'PRESTAMO',
    concepto: 'basa',
    categoria: 'Prestamo',
    icon: 'dollar',
    montoAbonado: 200000,
    montoDeuda: 100000,
    montoTotal: 5000000,
    cuotasAbonadas: 2,
    totalCuotas: 48,
    finalizado: false,
    fechaFinalizacion: '2025-12-31'
  },
  {
    idGasto: 3,
    tipoGasto: 'FIJO',
    concepto: 'Alquiler',
    categoria: 'Hogar',
    icon: 'home',
    montoAbonado: 0,
    montoDeuda: 300_000,
    montoTotal: 0,
    cuotasAbonadas: null,
    totalCuotas: null,
    finalizado: false,
    fechaFinalizacion: null
  }
];

function getProgress(gasto: Gasto): number {
  if (gasto.tipoGasto === 'PRESTAMO' && gasto.cuotasAbonadas != null && gasto.totalCuotas)
    return (gasto.cuotasAbonadas / gasto.totalCuotas) * 100;
  if (gasto.tipoGasto === 'TARJETA' && gasto.montoTotal > 0) return (gasto.montoAbonado / gasto.montoTotal) * 100;
  return 100;
}

function getProgressLabel(gasto: Gasto): string {
  if (gasto.tipoGasto === 'PRESTAMO') return `${gasto.cuotasAbonadas ?? 0}/${gasto.totalCuotas ?? 0} cuotas`;
  if (gasto.tipoGasto === 'TARJETA')
    return `${formatoMoneda.format(gasto.montoAbonado)} / ${formatoMoneda.format(gasto.montoTotal)}`;
  return 'Recurrente';
}

export default function Gasto() {
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
                    <CalendarX size={14} /> {gasto.fechaFinalizacion}
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
                <Button variant='outline' className='w-full' disabled={gasto.finalizado}>
                  Editar
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
