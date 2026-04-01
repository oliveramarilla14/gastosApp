-- CreateTable
CREATE TABLE "Pago" (
    "idPago" TEXT NOT NULL,
    "idGasto" TEXT,
    "descripcion" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "fechaPago" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("idPago")
);

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_idGasto_fkey" FOREIGN KEY ("idGasto") REFERENCES "Gasto"("idGasto") ON DELETE SET NULL ON UPDATE CASCADE;
