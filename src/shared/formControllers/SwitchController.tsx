import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import { Controller, Path, UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/app/gasto/(form)/schema';

export default function SwitchController({
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
