import { DetalleMensual, GastoType } from '@/entites/types/gasto.type';
import { IconName } from '@/lib/icons';
import { CategoriaGasto, Gasto, Pago } from '../../../generated/prisma/client';

type GastoConCategoria = Gasto & { categoria: CategoriaGasto };
type GastoConPagos = Gasto & { categoria: CategoriaGasto; pagos: Pago[] };

export function mapGastoToGastoType(gasto: GastoConCategoria): GastoType {
  const response: GastoType = {
    idGasto: gasto.idGasto,
    concepto: gasto.concepto,
    finalizado: gasto.finalizado,
    idCategoria: gasto.idCategoria,
    categoria: gasto.categoria.nombre,
    fechaFinalizacion: gasto.fechaFinalizacion ? gasto.fechaFinalizacion.toISOString() : null,
    fechaInicio: gasto.fechaInicio ? gasto.fechaInicio.toISOString() : null,
    tipoGasto: gasto.tipoGasto,
    montoAbonado: gasto.montoAbonado,
    montoDeuda: gasto.montoDeuda,
    montoTotal: gasto.montoTotal,
    cuotasAbonadas: gasto.cuotasAbonadas,
    totalCuotas: gasto.totalCuotas,
    diaPago: gasto.diaPago,
    icon: gasto.categoria.icon as IconName
  };

  return response;
}

export function mapGastoToDetalleMensual(
  gasto: GastoConPagos,
  ctx?: { month: number; year: number }
): DetalleMensual {
  let cuotaActual: number | undefined;
  if (gasto.tipoGasto === 'PRESTAMO' && gasto.fechaInicio && ctx) {
    const start = gasto.fechaInicio;
    cuotaActual = (ctx.year - start.getFullYear()) * 12 + (ctx.month - start.getMonth()) + 1;
  }

  const response: DetalleMensual = {
    idGasto: gasto.idGasto,
    concepto: gasto.concepto,
    categoria: gasto.categoria.nombre,
    pagoMes: gasto.montoDeuda,
    totalDeuda: gasto.montoTotal,
    pagado: gasto.pagos.length > 0,
    monto: gasto.montoDeuda,
    icon: gasto.categoria.icon as IconName,
    tipo: gasto.tipoGasto,
    abonado: gasto.montoAbonado,
    diaPago: gasto.diaPago,
    cuotaActual,
    totalCuotas: gasto.totalCuotas || undefined,
  };

  return response;
}
