import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DetalleMensual, TipoGasto } from '@/entites/types/gasto.type';
import { mapIcon } from '@/lib/icons';
import { formatoMoneda } from '@/lib/numbers';
import { cn } from '@/lib/utils';
import { PagarModal } from '@/widgets/PagarModal';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const ingresoMensual = 10_000_000;

const tipoBadge: Record<TipoGasto, string> = {
  TARJETA: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  PRESTAMO: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  FIJO: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const tipoLabel: Record<TipoGasto, string> = {
  TARJETA: 'Tarjeta',
  PRESTAMO: 'Préstamo',
  FIJO: 'Fijo',
};

function AvanceCell({ gasto }: { gasto: DetalleMensual }) {
  if (gasto.tipo === 'FIJO') return <span className='text-muted-foreground text-xs'>Recurrente</span>;
  if (gasto.tipo === 'PRESTAMO' && gasto.cuotaActual != null)
    return (
      <span className='text-xs font-medium'>
        {gasto.cuotaActual}
        <span className='text-muted-foreground'>/{gasto.totalCuotas}</span>
      </span>
    );
  return (
    <span className='text-xs font-medium'>
      {formatoMoneda.format(gasto.abonado)}
      <span className='text-muted-foreground'> / {formatoMoneda.format(gasto.totalDeuda)}</span>
    </span>
  );
}

export function MonthTable({ gastos, mes, anho }: { gastos: DetalleMensual[]; mes: number; anho: number }) {
  const sorted = [...gastos].sort((a, b) => a.diaPago - b.diaPago);
  const totalGastos = gastos.reduce((acc, g) => acc + g.monto, 0);
  const restante = ingresoMensual - totalGastos;

  return (
    <Card className='overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow className='hover:bg-transparent'>
            <TableHead className='w-16 text-center'>Día</TableHead>
            <TableHead>Concepto</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Avance</TableHead>
            <TableHead className='text-right'>Monto</TableHead>
            <TableHead className='w-24'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((gasto) => {
            const Icon = mapIcon(gasto.icon);
            return (
              <TableRow
                key={gasto.idGasto}
                className={cn(
                  'transition-colors',
                  gasto.pagado
                    ? 'bg-green-500/10  hover:bg-green-500/15'
                    : 'hover:bg-muted/50'
                )}
              >
                <TableCell className='text-center'>
                  <span className='text-sm font-semibold tabular-nums'>{gasto.diaPago}</span>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col gap-0.5'>
                    <Link
                      href={`/gasto/${gasto.idGasto}`}
                      className='font-medium hover:underline leading-tight'
                    >
                      {gasto.concepto}
                    </Link>
                    <Badge variant='outline' className={cn('w-fit text-[10px] px-1.5 py-0', tipoBadge[gasto.tipo])}>
                      {tipoLabel[gasto.tipo]}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
                    <Icon size={15} />
                    {gasto.categoria}
                  </div>
                </TableCell>
                <TableCell>
                  <AvanceCell gasto={gasto} />
                </TableCell>
                <TableCell className='text-right font-semibold tabular-nums'>
                  {formatoMoneda.format(gasto.monto)}
                </TableCell>
                <TableCell>
                  {gasto.pagado ? (
                    <span className='inline-flex items-center gap-1 text-green-500 text-xs font-medium'>
                      <CheckCircle2 size={14} /> Pagado
                    </span>
                  ) : (
                    <PagarModal gasto={gasto} mes={mes} anho={anho} />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className='text-muted-foreground text-xs'>
              Total gastos
            </TableCell>
            <TableCell className='text-right font-semibold tabular-nums'>{formatoMoneda.format(totalGastos)}</TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} className='text-muted-foreground text-xs'>
              Ingreso mensual
            </TableCell>
            <TableCell className='text-right font-semibold tabular-nums'>{formatoMoneda.format(ingresoMensual)}</TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} className={cn('text-xs font-medium', restante < 0 ? 'text-red-400' : 'text-green-400')}>
              Restante
            </TableCell>
            <TableCell className={cn('text-right font-bold tabular-nums', restante < 0 ? 'text-red-400' : 'text-green-400')}>
              {formatoMoneda.format(restante)}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
}
