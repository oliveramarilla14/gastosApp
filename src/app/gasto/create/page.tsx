import { Card } from '@/components/ui/card';
import MothSpentForm from '../(form)/MothSpentForm';

export default function Create() {
  return (
    <div className='flex items-center flex-col gap-2'>
      <Card className='p-5 max-w-2xl w-full'>
        <MothSpentForm />
      </Card>
    </div>
  );
}
