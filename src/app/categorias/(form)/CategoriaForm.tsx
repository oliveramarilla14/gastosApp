'use client';

import { Button } from '@/components/ui/button';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import InputController from '@/shared/formControllers/InputController';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { formSchema, FormValues } from './schema';
import IconPickerController from './IconPickerController';

const emptyDefaults: FormValues = { nombre: '', icon: 'help-circle' };

interface Props {
  defaultValues?: Partial<FormValues>;
  onSubmit: (data: FormValues) => Promise<unknown>;
}

export default function CategoriaForm({ defaultValues, onSubmit }: Props) {
  const form = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: { ...emptyDefaults, ...defaultValues }
  });

  return (
    <form onSubmit={form.handleSubmit(async (data) => {
      try {
        await onSubmit(data);
      } catch (e) {
        if ((e as { digest?: string })?.digest?.startsWith('NEXT_REDIRECT')) return;
        throw e;
      }
    })}>
      <FieldSet>
        <FieldGroup>
          <InputController form={form} name='nombre' label='Nombre' />
          <IconPickerController form={form} name='icon' label='Icono' />
        </FieldGroup>
      </FieldSet>
      <Button type='submit' className='mt-5 w-full'>
        Guardar
      </Button>
    </form>
  );
}
