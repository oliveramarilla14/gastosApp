import * as z from 'zod';

export const formSchema = z.object({
  finalizado: z.boolean(),
  concepto: z.string().min(1, 'El concepto es requerido'),
  categoria: z.enum(['Alquiler', 'Servicios', 'Comida', 'Transporte', 'Salud'], 'Categoria es requerida'),
  monto: z.coerce.number<number>().min(1, 'Introduzca un monto válido'),
  diaPago: z.coerce.number<number>().min(1, 'El día de pago es requerido').max(31, 'El día de pago debe estar entre 1 y 31'),
  tipo: z.enum(['Fijo', 'Tarjeta', 'Prestamo'], 'Tipo es requerido'),
  montoAbonado: z.coerce.number<number>().min(0, 'Introduzca un monto válido').optional(),
  montoTotal: z.coerce.number<number>().min(0, 'Introduzca un monto válido').optional(),
  cuotasAbonadas: z.coerce.number<number>().min(0, 'Introduzca un número válido').optional(),
  totalCuotas: z.coerce.number<number>().min(0, 'Introduzca un número válido').optional()
});

export type FormValues = z.infer<typeof formSchema>;
