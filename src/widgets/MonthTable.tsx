import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { mapIcon } from '@/lib/icons';
import { formatNumber, formatoMoneda } from '@/lib/numbers';
import { DetalleMensual } from '@/entites/types/gasto.type';
import { PagarModal } from '@/widgets/PagarModal';

const ingresoMensual = 10000000;
const TOTAL_COLUMNS = 5;
export function MonthTable({ gastos, mes, anho }: { gastos: DetalleMensual[]; mes: number; anho: number }) {
  const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.monto, 0);
  const restante = ingresoMensual - totalGastos;
  return (
    <Card className='p-5'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Concepto</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead className='text-center'>%</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gastos.map((gasto) => {
            const Icon = mapIcon(gasto.icon);
            return (
              <TableRow
                key={gasto.idGasto}
                className={cn(gasto.pagado ? 'bg-green-500 hover:bg-green-800' : '', 'cursor-pointer')}
              >
                <TableCell align='left'> {gasto.concepto}</TableCell>
                <TableCell align='left'>
                  <div className='flex items-center gap-2'>
                    <Icon size={18} />
                    {gasto.categoria}
                  </div>
                </TableCell>
                <TableCell align='center'>
                  {gasto.tipo === 'FIJO'
                    ? 'Fijo'
                    : `${formatNumber.format(gasto.abonado)} / ${formatNumber.format(gasto.totalDeuda)}`}
                </TableCell>
                <TableCell align='left'>{formatoMoneda.format(gasto.monto)}</TableCell>
                <TableCell>
                  <PagarModal gasto={gasto} mes={mes} anho={anho} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={TOTAL_COLUMNS - 1}>Total</TableCell>
            <TableCell align='left'>{formatoMoneda.format(totalGastos)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={TOTAL_COLUMNS - 1}>Ingreso</TableCell>
            <TableCell align='left'>{formatoMoneda.format(ingresoMensual)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={TOTAL_COLUMNS - 1}>Resta</TableCell>
            <TableCell align='left'>{formatoMoneda.format(restante)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
}
