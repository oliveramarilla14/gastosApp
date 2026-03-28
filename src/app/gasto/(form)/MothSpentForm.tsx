'use client';

import { Button } from '@/components/ui/button';
import { FieldGroup, FieldSeparator, FieldSet, FieldTitle } from '@/components/ui/field';
import InputController from '@/features/formControllers/InputController';
import SelectController from '@/features/formControllers/SelectController';
import SwitchController from '@/features/formControllers/SwitchController';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm, useWatch } from 'react-hook-form';
import { formSchema, FormValues } from './schema';

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
