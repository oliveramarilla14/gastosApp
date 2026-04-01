import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

function formatWithDots(value: string | number): string {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (!digits) return '';
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default function InputController<T extends FieldValues>({
  name,
  form,
  label,
  description,
  type = 'text',
  currency = false
}: {
  name: Path<T>;
  form: UseFormReturn<T>;
  label: string;
  description?: string;
  type?: HTMLInputTypeAttribute;
  currency?: boolean;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const inputType = currency ? 'text' : type;
        const displayValue = currency ? formatWithDots(field.value) : (field.value as string);
        const handleChange = currency
          ? (e: React.ChangeEvent<HTMLInputElement>) => {
              const digits = e.target.value.replace(/\D/g, '');
              field.onChange(digits === '' ? '' : digits);
            }
          : field.onChange;

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Input
              id={field.name}
              name={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              value={displayValue}
              onChange={handleChange}
              aria-invalid={fieldState.invalid}
              autoComplete='off'
              type={inputType}
              inputMode={currency ? 'numeric' : undefined}
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
