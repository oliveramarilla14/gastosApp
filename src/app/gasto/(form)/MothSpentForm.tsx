import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
  FieldTitle
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

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

export default function MothSpentForm() {
  return (
    <form>
      <FieldSet>
        <FieldGroup className='grid w-full md:grid-cols-2'>
          <FieldTitle className='text-xl font-bold'>Nuevo Gasto</FieldTitle>
          <Field orientation='horizontal' className='justify-end'>
            <FieldLabel htmlFor='finalizado'>Finalizado</FieldLabel>
            <Switch id='finalizado' />
          </Field>
        </FieldGroup>
        <FieldSeparator />
        {/* GENERAL */}
        <FieldGroup className='grid w-full items-baseline md:grid-cols-2'>
          <Field>
            <FieldLabel htmlFor='concepto'>Concepto</FieldLabel>
            <Input id='concepto' autoComplete='off' placeholder='Alquiler' />
          </Field>

          <Field className='w-full max-w-xs'>
            <FieldLabel>Categoria</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Seleccionar categoria' />
              </SelectTrigger>
              <SelectContent position='item-aligned'>
                <SelectGroup>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria.id} value={categoria.name}>
                      {categoria.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor='monto'>Monto</FieldLabel>
            <Input id='monto' type='number' min='0' />
            <FieldDescription>Compromiso mensual asumido.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor='diaPago'>Dia de Pago</FieldLabel>
            <Input id='diaPago' type='number' min='1' max='31' />
          </Field>
          <Field>
            <FieldLabel htmlFor='tipo'>Tipo</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Seleccionar tipo' />
              </SelectTrigger>
              <SelectContent position='item-aligned'>
                <SelectGroup>
                  {tipoGasto.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.name}>
                      {tipo.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>

        <FieldSeparator />
        {/* Prestamo y Tarjeta */}
        <FieldGroup className='grid w-full items-baseline md:grid-cols-2'>
          <Field>
            <FieldLabel htmlFor='montoAbonado'>Monto abonado</FieldLabel>
            <Input id='montoAbonado' type='number' />
            <FieldDescription>Monto abonado al momento de registrar el gasto.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor='montoTotal'>Monto total</FieldLabel>
            <Input id='montoTotal' type='number' />
            <FieldDescription>Linea de Credito total.</FieldDescription>
          </Field>

          {/*  Prestamos */}

          <Field>
            <FieldLabel htmlFor='cuotasAbonadas'>Cuotas abonadas</FieldLabel>
            <Input id='cuotasAbonadas' type='number' />
          </Field>
          <Field>
            <FieldLabel htmlFor='totalCuotas'>Total Cuotas</FieldLabel>
            <Input id='totalCuotas' type='number' />
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
