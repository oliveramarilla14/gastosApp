'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { iconNames, mapIcon } from '@/lib/icons';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

export default function IconPickerController<T extends FieldValues>({
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
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>
          <div className='flex flex-wrap gap-2 mt-1'>
            {iconNames.map((iconName) => {
              const Icon = mapIcon(iconName);
              const isSelected = field.value === iconName;
              return (
                <button
                  key={iconName}
                  type='button'
                  title={iconName}
                  onClick={() => field.onChange(iconName)}
                  className={cn(
                    'flex w-20 flex-col items-center justify-center gap-1 rounded-md border p-3 text-xs transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-input bg-background text-muted-foreground'
                  )}
                >
                  <Icon className='size-5' />
                  <span>{iconName}</span>
                </button>
              );
            })}
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
