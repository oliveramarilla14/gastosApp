'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export function MonthSelector({ mes, anho }: { mes: number; anho: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pickerAnho, setPickerAnho] = useState(anho);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  function navigate(delta: number) {
    let newMes = mes + delta;
    let newAnho = anho;
    if (newMes < 0) { newMes = 11; newAnho -= 1; }
    if (newMes > 11) { newMes = 0; newAnho += 1; }
    router.push(`?mes=${newMes}&anho=${newAnho}`);
  }

  function selectMonth(m: number) {
    router.push(`?mes=${m}&anho=${pickerAnho}`);
    setOpen(false);
  }

  return (
    <div className="relative flex items-center justify-center gap-4 w-full h-12 my-4" ref={ref}>
      <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
        <ChevronLeft />
      </Button>

      <button
        onClick={() => { setPickerAnho(anho); setOpen(v => !v); }}
        className="text-lg font-semibold w-48 text-center hover:underline underline-offset-4 cursor-pointer"
      >
        {MESES[mes]} {anho}
      </button>

      <Button variant="ghost" size="icon" onClick={() => navigate(1)}>
        <ChevronRight />
      </Button>

      {open && (
        <div className="absolute top-full mt-2 z-50 bg-popover border rounded-lg shadow-lg p-4 w-72">
          {/* Year selector */}
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="icon" onClick={() => setPickerAnho(y => y - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-semibold">{pickerAnho}</span>
            <Button variant="ghost" size="icon" onClick={() => setPickerAnho(y => y + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Month grid */}
          <div className="grid grid-cols-3 gap-1">
            {MESES.map((nombre, i) => (
              <button
                key={i}
                onClick={() => selectMonth(i)}
                className={`rounded-md py-1.5 text-sm hover:bg-accent transition-colors ${i === mes && pickerAnho === anho ? 'bg-primary text-primary-foreground font-semibold' : ''}`}
              >
                {nombre.slice(0, 3)}
              </button>
            ))}
          </div>

          <button
            onClick={() => { router.push('?'); setOpen(false); }}
            className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Ir al mes actual
          </button>
        </div>
      )}
    </div>
  );
}
