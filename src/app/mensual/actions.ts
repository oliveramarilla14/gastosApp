'use server';

import { revalidatePath } from 'next/cache';
import { crearPago } from '@/services/pago/pago.service';
import { TipoGasto } from '@/entites/types/gasto.type';

export async function pagarGasto(
  idGasto: string,
  tipoGasto: TipoGasto,
  monto: number,
  mes: number,
  anho: number,
  descripcion: string,
) {
  const fechaPago = new Date(anho, mes, 1);
  await crearPago(idGasto, tipoGasto, monto, fechaPago, descripcion);
  revalidatePath('/mensual');
}
