'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { formSchema } from './(form)/schema';
import * as z from 'zod';
import {
  createCategoria as createCategoriaService,
  updateCategoria as updateCategoriaService
} from '@/services/categorias/categorias.services';

export async function createCategoria(data: unknown) {
  const parsed = formSchema.safeParse(data);
  if (!parsed.success) return { error: z.flattenError(parsed.error) };

  await createCategoriaService(parsed.data);

  revalidatePath('/categorias');
  redirect('/categorias');
}

export async function updateCategoria(id: string, data: unknown) {
  const parsed = formSchema.safeParse(data);
  if (!parsed.success) return { error: z.flattenError(parsed.error) };

  await updateCategoriaService(id, parsed.data);

  revalidatePath('/categorias');
  redirect('/categorias');
}
