'use server';

import * as z from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { formSchema } from './(form)/schema';
import {
  createGasto as createGastoService,
  updateGasto as updateGastoService
} from '@/services/gastos/gastos.services';

export async function createGasto(data: unknown) {
  const parsed = formSchema.safeParse(data);
  if (!parsed.success) return { error: z.flattenError(parsed.error) };

  await createGastoService({ ...parsed.data, idOwner: 'TODO_AUTH' });

  revalidatePath('/gasto');
  redirect('/gasto');
}

export async function updateGasto(id: string, data: unknown) {
  const parsed = formSchema.safeParse(data);
  if (!parsed.success) return { error: z.flattenError(parsed.error) };

  await updateGastoService(id, parsed.data);

  revalidatePath('/gasto');
  redirect('/gasto');
}
