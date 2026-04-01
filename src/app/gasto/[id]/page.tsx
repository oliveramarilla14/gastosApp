import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { GastoType, TipoGasto } from '@/entites/types/gasto.type';
import type { IconName } from '@/lib/icons';
import { formatoMoneda } from '@/lib/numbers';
import { cn } from '@/lib/utils';
import { getGastoConPagos } from '@/services/gastos/gastos.services';
import {
  ArrowLeft,
  Calendar,
  CalendarDays,
  CalendarX,
  Car,
  CircleDollarSign,
  CreditCard,
  Hash,
  HelpCircle,
  Home,
  Lightbulb,
  PiggyBank,
  ShoppingCart,
  Wallet
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
  piggy: <PiggyBank />,
  'help-circle': <HelpCircle />
};

interface PagoHistorico {
  id: string;
  fecha: Date;
  monto: number;
  descripcion: string;
  cuota?: number;
}

function calcularCuota(inicio: Date, fechaPago: Date): number {
  return (fechaPago.getFullYear() - inicio.getFullYear()) * 12 + (fechaPago.getMonth() - inicio.getMonth()) + 1;
}

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
  const result = await getGastoConPagos(id);

  if (!result) notFound();

  const { gasto, pagos } = result;
  const progress = getProgress(gasto);

  const historial: PagoHistorico[] = pagos.map((p) => ({
    id: p.idPago,
    fecha: p.fechaPago,
    monto: p.monto,
    descripcion: p.descripcion,
    cuota:
      gasto.tipoGasto === 'PRESTAMO' && gasto.fechaInicio
        ? calcularCuota(new Date(gasto.fechaInicio), p.fechaPago)
        : undefined,
  }));

  const totalPagado = historial.reduce((acc, p) => acc + p.monto, 0);

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
              <p className='text-xl font-bold'>{historial.length}</p>
              <p className='text-xs text-muted-foreground mt-0.5'>{formatoMoneda.format(totalPagado)} total</p>
            </CardContent>
          </Card>
        )}

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

      {/* Details */}
      <Card className='mb-6'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-base'>Información del gasto</CardTitle>
        </CardHeader>
        <CardContent className='divide-y divide-border'>
          {gasto.fechaInicio && (
            <div className='flex items-center justify-between py-2.5'>
              <span className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Calendar size={14} /> Fecha de inicio
              </span>
              <span className='text-sm font-medium'>
                {new Date(gasto.fechaInicio).toLocaleDateString('es-PY')}
              </span>
            </div>
          )}
          {gasto.fechaFinalizacion && (
            <div className='flex items-center justify-between py-2.5'>
              <span className='flex items-center gap-2 text-sm text-muted-foreground'>
                <CalendarX size={14} /> Fecha de vencimiento
              </span>
              <span className='text-sm font-medium'>
                {new Date(gasto.fechaFinalizacion).toLocaleDateString('es-PY')}
              </span>
            </div>
          )}
          <div className='flex items-center justify-between py-2.5'>
            <span className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Hash size={14} /> Día de pago
            </span>
            <span className='text-sm font-medium'>Día {gasto.diaPago} de cada mes</span>
          </div>
          {gasto.tipoGasto === 'PRESTAMO' && (
            <>
              <div className='flex items-center justify-between py-2.5'>
                <span className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <CalendarDays size={14} /> Cuotas restantes
                </span>
                <span className='text-sm font-medium'>
                  {(gasto.totalCuotas ?? 0) - (gasto.cuotasAbonadas ?? 0)} de {gasto.totalCuotas ?? 0}
                </span>
              </div>
              <div className='flex items-center justify-between py-2.5'>
                <span className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Wallet size={14} /> Monto pendiente
                </span>
                <span className='text-sm font-medium'>
                  {formatoMoneda.format(gasto.montoTotal - gasto.montoAbonado)}
                </span>
              </div>
            </>
          )}
          {gasto.tipoGasto === 'TARJETA' && (
            <div className='flex items-center justify-between py-2.5'>
              <span className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Wallet size={14} /> Monto pendiente
              </span>
              <span className='text-sm font-medium'>
                {formatoMoneda.format(gasto.montoTotal - gasto.montoAbonado)}
              </span>
            </div>
          )}
          {gasto.tipoGasto === 'FIJO' && (
            <div className='flex items-center justify-between py-2.5'>
              <span className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Wallet size={14} /> Total abonado
              </span>
              <span className='text-sm font-medium'>{formatoMoneda.format(totalPagado)}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment history */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-base'>
            <CalendarDays size={18} />
            Historial de pagos
          </CardTitle>
          <CardDescription>
            {historial.length} pago{historial.length !== 1 ? 's' : ''} registrado{historial.length !== 1 ? 's' : ''}
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
                  <TableHead>Descripción</TableHead>
                  <TableHead className='text-right'>Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historial.map((pago) => (
                  <TableRow key={pago.id}>
                    <TableCell className='text-muted-foreground whitespace-nowrap'>
                      {pago.fecha.toLocaleDateString('es-PY')}
                    </TableCell>
                    {gasto.tipoGasto === 'PRESTAMO' && (
                      <TableCell className='text-muted-foreground'>
                        {pago.cuota != null ? `#${pago.cuota}` : '—'}
                      </TableCell>
                    )}
                    <TableCell className='text-muted-foreground'>{pago.descripcion}</TableCell>
                    <TableCell className='text-right font-medium'>{formatoMoneda.format(pago.monto)}</TableCell>
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
