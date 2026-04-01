import { MONTH } from '@/entites/enums/month.enum';
import { getPagosMesAnho } from '@/services/gastos/gastos.services';
import { MonthTable } from '@/widgets/MonthTable';
import Placeholder from '@/widgets/Placeholder';

export default async function page() {
  const mesActual = new Date().getMonth(); // 0-11
  const gastos = await getPagosMesAnho(Object.values(MONTH)[mesActual], 2026);
  return (
    <main>
      <h1 className='text-2xl font-bold'>Mensual</h1>
      {/* Agregar "slider" para seleccionar mes, con botones de adelante y atras y poder seleccionar anho especifico */}
      <Placeholder className='w-full h-12 my-4' text={`Mes actual ${Object.values(MONTH)[mesActual]}`} />
      <MonthTable gastos={gastos} />
    </main>
  );
}