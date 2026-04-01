'use client';

import { Button } from '@/components/ui/button';
import { FieldGroup, FieldSeparator, FieldSet, FieldTitle } from '@/components/ui/field';
import InputController from '@/shared/formControllers/InputController';
import SelectController from '@/shared/formControllers/SelectController';
import SwitchController from '@/shared/formControllers/SwitchController';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm, useWatch } from 'react-hook-form';
import { formSchema, FormValues } from './schema';

const tipoGasto = [
  { id: 'Fijo', name: 'Fijo' },
  { id: 'Tarjeta', name: 'Tarjeta' },
  { id: 'Prestamo', name: 'Préstamo' }
];

const emptyDefaults: FormValues = {
  finalizado: false,
  concepto: '',
  categoria: '',
  monto: 0,
  diaPago: 1,
  tipo: 'Fijo',
  montoAbonado: 0,
  montoTotal: 0,
  cuotasAbonadas: 0,
  totalCuotas: 0,
  fechaInicio: undefined
};

interface Props {
  defaultValues?: Partial<FormValues>;
  onSubmit: (data: FormValues) => Promise<unknown>;
  categorias: { id: string; name: string }[];
}

export default function MothSpentForm({ defaultValues, onSubmit, categorias }: Props) {
  const form = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: { ...emptyDefaults, ...defaultValues }
  });

  const { handleSubmit, setError } = form;
  const tipo = useWatch({ control: form.control, name: 'tipo' });

  async function handleFormSubmit(data: FormValues) {
    let hasErrors = false;

    if (data.tipo === 'Tarjeta' || data.tipo === 'Prestamo') {
      if (!data.montoTotal) {
        setError('montoTotal', { message: 'Introduzca un monto válido' });
        hasErrors = true;
      }
    }
    if (data.tipo === 'Prestamo') {
      if (!data.totalCuotas) {
        setError('totalCuotas', { message: 'Introduzca un número válido' });
        hasErrors = true;
      }
    }

    if (hasErrors) return;

    try {
      await onSubmit(parseFormData(data));
    } catch (e) {
      if ((e as { digest?: string })?.digest?.startsWith('NEXT_REDIRECT')) return;
      throw e;
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            currency
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
              currency
            />

            <InputController
              form={form}
              name='montoTotal'
              description='Linea de Credito total.'
              label='Monto total'
              currency
            />
          </FieldGroup>
        )}

        {/*  Prestamos */}
        {tipo === 'Prestamo' && (
          <FieldGroup className='grid w-full items-baseline md:grid-cols-2'>
            <InputController form={form} name='cuotasAbonadas' label='Cuotas abonadas' type='number' />

            <InputController form={form} name='totalCuotas' label='Total Cuotas' type='number' />

            <InputController form={form} name='fechaInicio' label='Mes de inicio' type='month' />
          </FieldGroup>
        )}
      </FieldSet>
      <Button type='submit' className='mt-5 w-full'>
        Guardar
      </Button>
    </form>
  );
}

function parseFormData(data: FormValues): FormValues {
  const response: FormValues = { ...data };

  if (data.tipo === 'Fijo') {
    response.montoAbonado = undefined;
    response.montoTotal = undefined;
    response.cuotasAbonadas = undefined;
    response.totalCuotas = undefined;
    response.fechaInicio = undefined;
  }

  if (data.tipo === 'Tarjeta') {
    response.cuotasAbonadas = undefined;
    response.totalCuotas = undefined;
    response.fechaInicio = undefined;
  }

  return response;
}
