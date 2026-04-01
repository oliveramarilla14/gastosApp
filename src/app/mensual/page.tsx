export const dynamic = 'force-dynamic';

import { getPagosMesAnho } from '@/services/gastos/gastos.services';
import { MonthSelector } from '@/widgets/MonthSelector';
import { MonthTable } from '@/widgets/MonthTable';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ mes?: string; anho?: string }>;
}) {
  const { mes: mesParam, anho: anhoParam } = await searchParams;
  const mes = mesParam !== undefined ? Number(mesParam) : new Date().getMonth();
  const anho = anhoParam !== undefined ? Number(anhoParam) : new Date().getFullYear();

  const gastos = await getPagosMesAnho(mes, anho);

  return (
    <main>
      <h1 className='text-2xl font-bold'>Mensual</h1>
      <MonthSelector mes={mes} anho={anho} />
      <MonthTable gastos={gastos} mes={mes} anho={anho} />
    </main>
  );
}
