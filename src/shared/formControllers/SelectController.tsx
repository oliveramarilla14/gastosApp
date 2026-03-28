import {
  Field,
  FieldError,
  FieldLabel} from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

export default function SelectController<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  items
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
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
