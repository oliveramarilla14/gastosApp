import { getGastosParaDashboard } from '@/services/gastos/gastos.services';
import { GastosDashboardChart } from '@/components/GastosDashboardChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Home() {
  const year = new Date().getFullYear();
  const dashboardData = await getGastosParaDashboard(year);

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Resumen {year}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Gastos mensuales por categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <GastosDashboardChart dashboardData={dashboardData} />
        </CardContent>
      </Card>
    </main>
  );
}
