import { prisma } from '@/lib/prisma';
import { CreateGastoInput } from '@/entites/types/gasto.type';
import { mapGastoToDetalleMensual, mapGastoToGastoType } from './gastos.mapper';

export async function getGastos() {
  const gasto = await prisma.gasto.findMany({
    include: {
      categoria: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return gasto.map(mapGastoToGastoType);
}

export async function getGastoById(id: string) {
  const row = await prisma.gasto.findUnique({
    where: { idGasto: id },
    include: { categoria: true }
  });
  if (!row) return null;
  return mapGastoToGastoType(row);
}

export async function getGastoConPagos(id: string) {
  const row = await prisma.gasto.findUnique({
    where: { idGasto: id },
    include: {
      categoria: true,
      pagos: { orderBy: { fechaPago: 'desc' } },
    },
  });
  if (!row) return null;
  return { gasto: mapGastoToGastoType(row), pagos: row.pagos };
}

const tipoMap = { Fijo: 'FIJO', Tarjeta: 'TARJETA', Prestamo: 'PRESTAMO' } as const;

export async function createGasto(data: CreateGastoInput) {
  return prisma.gasto.create({
    data: {
      concepto: data.concepto,
      idCategoria: data.categoria,
      finalizado: data.finalizado,
      tipoGasto: tipoMap[data.tipo],
      montoDeuda: data.monto,
      diaPago: data.diaPago,
      idOwner: data.idOwner,
      montoAbonado: data.montoAbonado ?? 0,
      montoTotal: data.montoTotal ?? 0,
      cuotasAbonadas: data.cuotasAbonadas ?? 0,
      totalCuotas: data.totalCuotas ?? 0,
      fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : null
    }
  });
}

export async function updateGasto(id: string, data: Omit<CreateGastoInput, 'idOwner'>) {
  return prisma.gasto.update({
    where: { idGasto: id },
    data: {
      concepto: data.concepto,
      idCategoria: data.categoria,
      finalizado: data.finalizado,
      tipoGasto: tipoMap[data.tipo],
      montoDeuda: data.monto,
      diaPago: data.diaPago,
      montoAbonado: data.montoAbonado ?? 0,
      montoTotal: data.montoTotal ?? 0,
      cuotasAbonadas: data.cuotasAbonadas ?? 0,
      totalCuotas: data.totalCuotas ?? 0,
      fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : null
    }
  });
}


export async function getPagosMesAnho(month: number, year: number) {
  const desde = new Date(year, month, 1);
  const hasta = new Date(year, month + 1, 1);

  const gastos = await prisma.gasto.findMany({
    where: { finalizado: false },
    include: {
      categoria: true,
      pagos: {
        where: {
          fechaPago: { gte: desde, lt: hasta },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const filtered = gastos.filter(gasto => {
    if (gasto.tipoGasto !== 'PRESTAMO' || !gasto.fechaInicio) return true;
    const start = gasto.fechaInicio;
    const cuota = (year - start.getFullYear()) * 12 + (month - start.getMonth()) + 1;
    return cuota >= 1 && cuota <= gasto.totalCuotas;
  });

  return filtered.map(g => mapGastoToDetalleMensual(g, { month, year }));
}