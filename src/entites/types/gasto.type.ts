import { IconName } from "@/lib/icons";

export interface GastoType {
  idGasto: string;
  concepto: string;
  finalizado: boolean;
  idCategoria: string;
  categoria: string;
  fechaFinalizacion: string | null;
  fechaInicio: string | null;
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
  fechaInicio?: string | null;
}


export interface MonthData {
  mes: string;
  [catName: string]: number | string;
}

export interface DashboardData {
  data: MonthData[];
  categories: string[];
}

export interface DetalleMensual {
  idGasto: string;
  concepto: string;
  icon: IconName;
  categoria: string;
  pagoMes: number; //cuota o mensualidad de tarjeta
  totalDeuda: number; //total cuotas o total deuda tarjetau
  pagado: boolean;
  monto: number;
  tipo: TipoGasto;
  abonado: number;
  diaPago: number;
  cuotaActual?: number;
  totalCuotas?: number;
}