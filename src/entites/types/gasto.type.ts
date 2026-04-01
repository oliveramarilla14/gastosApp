import { IconName } from "@/lib/icons";

export interface GastoType {
  idGasto: string;
  concepto: string;
  finalizado: boolean;
  idCategoria: string;
  categoria: string;
  fechaFinalizacion: string | null;
  tipoGasto: TipoGasto;
  montoAbonado: number;
  montoDeuda: number; // compromiso mensual en todos los tipos
  montoTotal: number;
  cuotasAbonadas: number | null;
  totalCuotas: number | null;
  diaPago: number;
  icon: IconName;
}
export type TipoGasto = 'TARJETA' | 'PRESTAMO' | 'FIJO';

export interface CreateGastoInput {
  concepto: string;
  categoria: string;
  finalizado: boolean;
  tipo: 'Fijo' | 'Tarjeta' | 'Prestamo';
  monto: number;
  diaPago: number;
  idOwner: string;
  montoAbonado?: number;
  montoTotal?: number;
  cuotasAbonadas?: number;
  totalCuotas?: number;
}
