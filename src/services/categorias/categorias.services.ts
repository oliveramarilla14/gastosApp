import { prisma } from '@/lib/prisma';
import { mapCategoriaToType } from './categorias.mapper';

export async function getCategorias() {
  const rows = await prisma.categoriaGasto.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return rows.map(mapCategoriaToType);
}

export async function getCategoriaById(id: string) {
  const row = await prisma.categoriaGasto.findUnique({
    where: { idCategoria: id }
  });
  if (!row) return null;
  return mapCategoriaToType(row);
}
