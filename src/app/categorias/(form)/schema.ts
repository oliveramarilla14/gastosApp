import * as z from 'zod';
import { iconNames } from '@/lib/icons';

export const formSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  icon: z.enum(iconNames, 'El icono es requerido')
});

export type FormValues = z.infer<typeof formSchema>;
