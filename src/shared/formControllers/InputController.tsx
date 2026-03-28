import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

export default function InputController<T extends FieldValues>({
  name,
  form,
  label,
  description,
  type = 'text'
}: {
  name: Path<T>;
  form: UseFormReturn<T>;
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
