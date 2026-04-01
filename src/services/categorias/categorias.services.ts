import { prisma } from '@/lib/prisma';
import { mapCategoriaToType } from './categorias.mapper';

export async function getCategorias() {
  

  const rows = await prisma.categoriaGasto.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return rows.map(mapCategoriaToType);
}

export async function getCategoriaById(id: string) {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const row = await prisma.categoriaGasto.findUnique({
    where: { idCategoria: id }
  });
  if (!row) return null;
  return mapCategoriaToType(row);
}

export async function createCategoria(data: { nombre: string; icon: string }) {
  return prisma.categoriaGasto.create({ data });
}

export async function updateCategoria(id: string, data: { nombre: string; icon: string }) {
  return prisma.categoriaGasto.update({
    where: { idCategoria: id },
    data
  });
}
