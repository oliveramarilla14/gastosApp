import { MonthTable } from '@/widgets/MonthTable';

export default function Home() {
  return (
    <main className='text-center'>
      <h1 className='text-2xl font-bold'>Gastos App</h1>

      <div className=' mt-5 '>
        <MonthTable />
      </div>
    </main>
  );
}
