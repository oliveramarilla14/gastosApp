import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

export default function SwitchController<T extends FieldValues>({
  form,
  name,
  label
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
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
