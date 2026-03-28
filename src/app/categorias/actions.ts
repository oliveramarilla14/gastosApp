'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { formSchema } from './(form)/schema';

export async function createCategoria(data: unknown) {
  const parsed = formSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.flatten() };

  await prisma.categoriaGasto.create({
    data: { nombre: parsed.data.nombre, icon: parsed.data.icon }
  });

  revalidatePath('/categorias');
  redirect('/categorias');
}

export async function updateCategoria(id: string, data: unknown) {
  const parsed = formSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.flatten() };

  await prisma.categoriaGasto.update({
    where: { idCategoria: id },
    data: { nombre: parsed.data.nombre, icon: parsed.data.icon }
  });

  revalidatePath('/categorias');
  redirect('/categorias');
}
