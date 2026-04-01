import { prisma } from '@/lib/prisma';
import { TipoGasto } from '@/entites/types/gasto.type';

export async function crearPago(
  idGasto: string,
  tipoGasto: TipoGasto,
  monto: number,
  fechaPago: Date,
  descripcion: string,
) {
  const gastoUpdate: Record<string, unknown> = {};
  if (tipoGasto === 'TARJETA' || tipoGasto === 'PRESTAMO') {
    gastoUpdate.montoAbonado = { increment: monto };
  }
  if (tipoGasto === 'PRESTAMO') {
    gastoUpdate.cuotasAbonadas = { increment: 1 };
  }

  const ops = [prisma.pago.create({ data: { idGasto, monto, fechaPago, descripcion } })];
  if (Object.keys(gastoUpdate).length > 0) {
    ops.push(prisma.gasto.update({ where: { idGasto }, data: gastoUpdate }) as never);
  }

  await prisma.$transaction(ops);
}
