import { IconName } from "@/lib/icons";

export interface GastoType {
  idGasto: string;
  concepto: string;
  finalizado: boolean;
  categoria: string;
  fechaFinalizacion: string | null;
  tipoGasto: TipoGasto;
  montoAbonado: number;
  montoDeuda: number; // compromiso mensual en todos los tipos
  montoTotal: number;
  cuotasAbonadas: number | null;
  totalCuotas: number | null;
  icon: IconName;
}
export type TipoGasto = 'TARJETA' | 'PRESTAMO' | 'FIJO';

