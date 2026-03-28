import { prisma } from '@/lib/prisma';
import { mapGastoToGastoType } from './gastos.mapper';

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
