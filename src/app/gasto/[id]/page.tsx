import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { IconName } from '@/lib/icons';
import { formatoMoneda } from '@/lib/numbers';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  CalendarDays,
  CalendarX,
  Car,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  CreditCard,
  HelpCircle,
  Home,
  Lightbulb,
  PiggyBank,
  ShoppingCart
} from 'lucide-react';
import Link from 'next/link';
import { cloneElement } from 'react';
import { notFound } from 'next/navigation';

const iconElements: Record<IconName, React.ReactElement<{ size?: number }>> = {
  home: <Home />,
  car: <Car />,
  lightbulb: <Lightbulb />,
  'shopping-cart': <ShoppingCart />,
  creditCard: <CreditCard />,
  dollar: <CircleDollarSign />,
  piggy: <PiggyBank />
};

type TipoGasto = 'TARJETA' | 'PRESTAMO' | 'FIJO';

interface Gasto {
  idGasto: number;
  concepto: string;
  finalizado: boolean;
  categoria: string;
  fechaFinalizacion: string | null;
  tipoGasto: TipoGasto;
  montoAbonado: number;
  montoDeuda: number;
  montoTotal: number;
  cuotasAbonadas: number | null;
  totalCuotas: number | null;
  icon: IconName;
}

interface PagoHistorico {
  id: number;
  fecha: string;
  monto: number;
  cuota?: number;
  estado: 'pagado' | 'pendiente';
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

const historicoPorGasto: Record<number, PagoHistorico[]> = {
  1: [
    { id: 1, fecha: '2026-03-05', monto: 200000, estado: 'pagado' },
    { id: 2, fecha: '2026-02-05', monto: 200000, estado: 'pagado' },
    { id: 3, fecha: '2026-01-05', monto: 200000, estado: 'pagado' },
    { id: 4, fecha: '2025-12-05', monto: 200000, estado: 'pagado' },
    { id: 5, fecha: '2025-11-05', monto: 200000, estado: 'pagado' },
    { id: 6, fecha: '2026-04-05', monto: 200000, estado: 'pendiente' }
  ],
  2: [
    { id: 1, fecha: '2026-03-10', monto: 100000, cuota: 2, estado: 'pagado' },
    { id: 2, fecha: '2026-02-10', monto: 100000, cuota: 1, estado: 'pagado' },
    { id: 3, fecha: '2026-04-10', monto: 100000, cuota: 3, estado: 'pendiente' }
  ],
  3: [
    { id: 1, fecha: '2026-03-01', monto: 300000, estado: 'pagado' },
    { id: 2, fecha: '2026-02-01', monto: 300000, estado: 'pagado' },
    { id: 3, fecha: '2026-01-01', monto: 300000, estado: 'pagado' },
    { id: 4, fecha: '2025-12-01', monto: 300000, estado: 'pagado' },
    { id: 5, fecha: '2026-04-01', monto: 300000, estado: 'pendiente' }
  ]
};

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

const tipoBadgeVariant: Record<TipoGasto, string> = {
  TARJETA: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  PRESTAMO: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  FIJO: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};

const tipoLabel: Record<TipoGasto, string> = {
  TARJETA: 'Tarjeta',
  PRESTAMO: 'Préstamo',
  FIJO: 'Fijo'
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const gasto = gastos.find((g) => g.idGasto === Number(id));

  if (!gasto) notFound();

  const progress = getProgress(gasto);
  const historial = historicoPorGasto[gasto.idGasto] ?? [];
  const pagados = historial.filter((p) => p.estado === 'pagado');
  const pendientes = historial.filter((p) => p.estado === 'pendiente');

  return (
    <main className='max-w-2xl mx-auto'>
      {/* Back */}
      <Button asChild variant='ghost' size='sm' className='mb-4 -ml-2'>
        <Link href='/gasto'>
          <ArrowLeft size={16} />
          Volver
        </Link>
      </Button>

      {/* Header */}
      <div className={cn('flex items-center gap-4 mb-6', gasto.finalizado && 'opacity-50')}>
        <div className='p-3 rounded-xl bg-muted'>
          {cloneElement(iconElements[gasto.icon] ?? <HelpCircle />, { size: 28 })}
        </div>
        <div>
          <h1 className='text-2xl font-bold'>{gasto.concepto}</h1>
          <div className='flex gap-2 mt-1'>
            <Badge variant='outline' className={cn('text-xs', tipoBadgeVariant[gasto.tipoGasto])}>
              {tipoLabel[gasto.tipoGasto]}
            </Badge>
            <Badge variant='secondary' className='text-xs'>
              {gasto.categoria}
            </Badge>
            {gasto.finalizado && <Badge className='bg-green-600 text-xs'>Finalizado</Badge>}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className='grid grid-cols-2 gap-3 mb-6'>
        <Card>
          <CardHeader className='pb-1'>
            <CardDescription className='text-xs'>Pago mensual</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-xl font-bold'>{formatoMoneda.format(gasto.montoDeuda)}</p>
          </CardContent>
        </Card>

        {gasto.tipoGasto === 'TARJETA' && (
          <Card>
            <CardHeader className='pb-1'>
              <CardDescription className='text-xs'>Deuda total</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-xl font-bold'>{formatoMoneda.format(gasto.montoTotal)}</p>
              <p className='text-xs text-muted-foreground mt-0.5'>
                Abonado: {formatoMoneda.format(gasto.montoAbonado)}
              </p>
            </CardContent>
          </Card>
        )}

        {gasto.tipoGasto === 'PRESTAMO' && (
          <Card>
            <CardHeader className='pb-1'>
              <CardDescription className='text-xs'>Cuotas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-xl font-bold'>
                {gasto.cuotasAbonadas ?? 0}
                <span className='text-sm font-normal text-muted-foreground'>/{gasto.totalCuotas ?? 0}</span>
              </p>
              <p className='text-xs text-muted-foreground mt-0.5'>{formatoMoneda.format(gasto.montoTotal)} total</p>
            </CardContent>
          </Card>
        )}

        {gasto.tipoGasto === 'FIJO' && (
          <Card>
            <CardHeader className='pb-1'>
              <CardDescription className='text-xs'>Pagos realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-xl font-bold'>{pagados.length}</p>
              <p className='text-xs text-muted-foreground mt-0.5'>
                {formatoMoneda.format(pagados.length * gasto.montoDeuda)} total
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className='pb-1'>
            <CardDescription className='text-xs'>Vencimiento</CardDescription>
          </CardHeader>
          <CardContent className='flex items-center gap-2'>
            <CalendarX size={16} className='text-muted-foreground shrink-0' />
            <p className='text-sm font-medium'>{gasto.fechaFinalizacion ?? 'Sin fecha'}</p>
          </CardContent>
        </Card>

        <Card className='col-span-2'>
          <CardHeader className='pb-2'>
            <CardDescription className='text-xs'>Progreso</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className='w-full'>
              <ProgressLabel>{getProgressLabel(gasto)}</ProgressLabel>
              <ProgressValue />
            </Progress>
          </CardContent>
        </Card>
      </div>

      {/* Payment history */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-base'>
            <CalendarDays size={18} />
            Historial de pagos
          </CardTitle>
          <CardDescription>
            {pagados.length} pagado{pagados.length !== 1 ? 's' : ''} · {pendientes.length} pendiente
            {pendientes.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent className='p-0'>
          {historial.length === 0 ? (
            <p className='text-sm text-muted-foreground px-6 pb-6'>Sin registros de pago.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  {gasto.tipoGasto === 'PRESTAMO' && <TableHead>Cuota</TableHead>}
                  <TableHead>Monto</TableHead>
                  <TableHead className='text-right'>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historial
                  .slice()
                  .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                  .map((pago) => (
                    <TableRow key={pago.id}>
                      <TableCell className='text-muted-foreground'>{pago.fecha}</TableCell>
                      {gasto.tipoGasto === 'PRESTAMO' && (
                        <TableCell className='text-muted-foreground'>
                          {pago.cuota != null ? `#${pago.cuota}` : '—'}
                        </TableCell>
                      )}
                      <TableCell className='font-medium'>{formatoMoneda.format(pago.monto)}</TableCell>
                      <TableCell className='text-right'>
                        {pago.estado === 'pagado' ? (
                          <span className='inline-flex items-center gap-1 text-green-400 text-xs'>
                            <CheckCircle2 size={13} /> Pagado
                          </span>
                        ) : (
                          <span className='inline-flex items-center gap-1 text-yellow-400 text-xs'>
                            <Clock size={13} /> Pendiente
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
