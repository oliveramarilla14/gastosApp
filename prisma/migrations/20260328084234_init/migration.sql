-- CreateEnum
CREATE TYPE "TipoGasto" AS ENUM ('TARJETA', 'PRESTAMO', 'FIJO');

-- CreateTable
CREATE TABLE "Gasto" (
    "idGasto" TEXT NOT NULL,
    "concepto" TEXT NOT NULL,
    "idCategoria" TEXT NOT NULL,
    "finalizado" BOOLEAN NOT NULL DEFAULT false,
    "fechaFinalizacion" TIMESTAMP(3),
    "tipoGasto" "TipoGasto" NOT NULL,
    "montoDeuda" INTEGER NOT NULL,
    "montoAbonado" INTEGER NOT NULL DEFAULT 0,
    "montoTotal" INTEGER NOT NULL DEFAULT 0,
    "cuotasAbonadas" INTEGER NOT NULL DEFAULT 0,
    "totalCuotas" INTEGER NOT NULL DEFAULT 0,
    "diaPago" INTEGER NOT NULL,
    "idOwner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gasto_pkey" PRIMARY KEY ("idGasto")
);
