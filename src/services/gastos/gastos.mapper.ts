import { GastoType } from '@/entites/types/gasto.type';
import { CategoriaGasto, Gasto } from '../../../generated/prisma/client';

type GastoConCategoria = Gasto & { categoria: CategoriaGasto };

export function mapGastoToGastoType(gasto: GastoConCategoria): GastoType {
  const response: GastoType = {
    idGasto: gasto.idGasto,
    concepto: gasto.concepto,
    finalizado: gasto.finalizado,
    categoria: gasto.categoria.nombre,
    fechaFinalizacion: gasto.fechaFinalizacion ? gasto.fechaFinalizacion.toISOString() : null,
    tipoGasto: gasto.tipoGasto,
    montoAbonado: gasto.montoAbonado,
    montoDeuda: gasto.montoDeuda,
    montoTotal: gasto.montoTotal,
    cuotasAbonadas: gasto.cuotasAbonadas,
    totalCuotas: gasto.totalCuotas,
    icon: "home"
  };

  return response;
}
