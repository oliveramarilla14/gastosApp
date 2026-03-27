import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { IconName, mapIcon } from '@/lib/icons';
import { formatNumber, formatoMoneda } from '@/lib/numbers';

interface DetalleMensual {
  idGasto: number;
  concepto: string;
  icon: IconName;
  categoria: string;
  pagoMes: number; //cuota o mensualidad de tarjeta
  totalDeuda: number; //total cuotas o total deuda tarjetau
  pagado: boolean;
  monto: number;
}

const gastosAbril: DetalleMensual[] = [
  {
    idGasto: 1,
    concepto: 'Alquiler',
    icon: 'home',
    categoria: 'Vivienda',
    pagoMes: 0,
    totalDeuda: 0,
    pagado: true,
    monto: 5000000
  },
  {
    idGasto: 2,
    concepto: 'Supermercado',
    icon: 'shopping-cart',
    categoria: 'Alimentación',
    pagoMes: 3,
    totalDeuda: 12,
    pagado: true,
    monto: 1500000
  },
  {
    idGasto: 3,
    concepto: 'Electricidad',
    icon: 'lightbulb',
    categoria: 'Servicios',
    pagoMes: 1,
    totalDeuda: 4,
    pagado: false,
    monto: 300000
  },
  {
    idGasto: 25,
    concepto: 'TC Conti',
    icon: 'home',
    categoria: 'Tarjetas',
    pagoMes: 500000,
    totalDeuda: 7000000,
    pagado: true,
    monto: 5000000
  }
];

const ingresoMensual = 10000000;
const totalGastos = gastosAbril.reduce((acc, gasto) => acc + gasto.monto, 0);
const restante = ingresoMensual - totalGastos;


export function MonthTable() {
  const mes = 'Abril';
  return (
    <Card className='p-5'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={4} className='text-center text-lg'>
              {mes}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead>Concepto</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead className='text-center'>%</TableHead>
            <TableHead>Monto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gastosAbril.map((gasto) => {
            const Icon = mapIcon(gasto.icon);
            return (
              <TableRow
                key={gasto.idGasto}
                className={cn(gasto.pagado ? '' : 'bg-green-500 hover:bg-green-800', 'cursor-pointer')}
              >
                <TableCell align='left'> {gasto.concepto}</TableCell>
                <TableCell align='left'>
                  <div className='flex items-center gap-2'>
                    <Icon size={18} />
                    {gasto.categoria}
                  </div>
                </TableCell>
                <TableCell>
                  {gasto.pagoMes === 0 && gasto.totalDeuda === 0
                    ? 'Fijo'
                    : `${formatNumber.format(gasto.pagoMes)} / ${formatNumber.format(gasto.totalDeuda)}`}
                </TableCell>
                <TableCell align='left'>{formatoMoneda.format(gasto.monto)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align='left'>{formatoMoneda.format(totalGastos)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Ingreso</TableCell>
            <TableCell align='left'>{formatoMoneda.format(ingresoMensual)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Resta</TableCell>
            <TableCell align='left'>{formatoMoneda.format(restante)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
}
