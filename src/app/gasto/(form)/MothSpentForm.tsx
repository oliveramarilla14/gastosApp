'use client';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
  FieldTitle
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { HTMLInputTypeAttribute } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { Controller, Path, UseFormReturn, useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';

const categorias = [
  { id: 1, name: 'Alquiler' },
  { id: 2, name: 'Servicios' },
  { id: 3, name: 'Comida' },
  { id: 4, name: 'Transporte' },
  { id: 5, name: 'Salud' }
];

const tipoGasto = [
  { id: 1, name: 'Fijo' },
  { id: 2, name: 'Tarjeta' },
  { id: 3, name: 'Prestamo' }
];

const formSchema = z.object({
  finalizado: z.boolean(),
  concepto: z.string().min(1, 'El concepto es requerido'),
  categoria: z.enum(['Alquiler', 'Servicios', 'Comida', 'Transporte', 'Salud'], 'Categoria es requerida'),
  monto: z.coerce.number().min(1, 'Introduzca un monto válido'),
  diaPago: z.coerce.number().min(1, 'El día de pago es requerido').max(31, 'El día de pago debe estar entre 1 y 31'),
  tipo: z.enum(['Fijo', 'Tarjeta', 'Prestamo'], 'Tipo es requerido'),
  montoAbonado: z.coerce.number().min(1, 'Introduzca un monto válido').optional(),
  montoTotal: z.coerce.number().min(1, 'Introduzca un monto válido').optional(),
  cuotasAbonadas: z.coerce.number().min(1, 'Introduzca un número válido').optional(),
  totalCuotas: z.coerce.number().min(1, 'Introduzca un número válido').optional()
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  finalizado: false,
  concepto: '',
  categoria: 'Alquiler',
  monto: 0,
  diaPago: 1,
  tipo: 'Fijo',
  montoAbonado: 0,
  montoTotal: 0,
  cuotasAbonadas: 0,
  totalCuotas: 0
};
export default function MothSpentForm() {
  const form = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues
  });

  const { handleSubmit } = form;
  const tipo = useWatch({ control: form.control, name: 'tipo' });
  function onSubmit(data: FormValues) {
    console.log('Raw data: ', data);

    const formData = parseForm(data);

    console.log('parsed Data: ', formData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup className='grid w-full md:grid-cols-2'>
          <FieldTitle className='text-xl font-bold'>Nuevo Gasto</FieldTitle>
          <SwitchController form={form} name='finalizado' label='Finalizado' />
        </FieldGroup>
        <FieldSeparator />

        {/* GENERAL */}

        <FieldGroup className='grid w-full items-baseline md:grid-cols-2'>
          <InputController name='concepto' form={form} label='Concepto' />
          <SelectController
            form={form}
            name='categoria'
            placeholder='Seleccionar categoria'
            label='Categoria'
            items={categorias}
          />

          <InputController
            form={form}
            name='monto'
            description='Compromiso mensual asumido'
            label='Monto'
            type='number'
          />

          <InputController form={form} name='diaPago' label='Dia de Pago' type='number' />
          <SelectController form={form} name='tipo' label='Tipo' placeholder='Seleccionar tipo' items={tipoGasto} />
        </FieldGroup>

        <FieldSeparator />
        {/* Prestamo y Tarjeta */}
        {(tipo === 'Tarjeta' || tipo === 'Prestamo') && (
          <FieldGroup className='grid w-full items-baseline md:grid-cols-2'>
            <InputController
              form={form}
              name='montoAbonado'
              description='Monto abonado al momento de registrar el gasto.'
              label='Monto abonado'
              type='number'
            />

            <InputController
              form={form}
              name='montoTotal'
              description='Linea de Credito total.'
              label='Monto total'
              type='number'
            />
          </FieldGroup>
        )}

        {/*  Prestamos */}
        {tipo === 'Prestamo' && (
          <FieldGroup className='grid w-full items-baseline md:grid-cols-2'>
            <InputController form={form} name='cuotasAbonadas' label='Cuotas abonadas' type='number' />

            <InputController form={form} name='totalCuotas' label='Total Cuotas' type='number' />
          </FieldGroup>
        )}
      </FieldSet>
      <Button type='submit' className='mt-5 w-full'>
        Guardar
      </Button>
    </form>
  );
}

function parseForm(data: FormValues) {
  if (data.tipo === 'Fijo') {
    data.montoAbonado = undefined;
    data.montoTotal = undefined;
    data.cuotasAbonadas = undefined;
    data.totalCuotas = undefined;
  } else if (data.tipo === 'Tarjeta') {
    data.cuotasAbonadas = undefined;
    data.totalCuotas = undefined;
  }
  return data;
}
function InputController({
  name,
  form,
  label,
  description,
  type = 'text'
}: {
  name: Path<FormValues>;
  form: UseFormReturn<FormValues>;
  label: string;
  description?: string;
  type?: HTMLInputTypeAttribute;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Input
              id={field.name}
              {...field}
              value={field.value as string}
              aria-invalid={fieldState.invalid}
              autoComplete='off'
              type={type}
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}

function SelectController({
  form,
  name,
  label,
  placeholder,
  items
}: {
  form: UseFormReturn<FormValues>;
  name: Path<FormValues>;
  label: string;
  items?: { id: number; name: string }[];
  placeholder?: string;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>
          <Select name={field.name} value={field.value as string} onValueChange={field.onChange}>
            <SelectTrigger aria-invalid={fieldState.invalid}>
              <SelectValue placeholder={placeholder ?? 'Seleccione'} />
            </SelectTrigger>
            <SelectContent position='item-aligned'>
              <SelectGroup>
                {items?.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

function SwitchController({
  form,
  name,
  label
}: {
  form: UseFormReturn<FormValues>;
  name: Path<FormValues>;
  label: string;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field orientation='horizontal' data-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
          <Switch
            id={field.name}
            name={field.name}
            checked={field.value as boolean}
            onCheckedChange={field.onChange}
            aria-invalid={fieldState.invalid}
          />
        </Field>
      )}
    />
  );
}
