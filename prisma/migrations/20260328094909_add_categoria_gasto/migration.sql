-- CreateTable
CREATE TABLE "CategoriaGasto" (
    "idCategoria" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoriaGasto_pkey" PRIMARY KEY ("idCategoria")
);

-- AddForeignKey
ALTER TABLE "Gasto" ADD CONSTRAINT "Gasto_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "CategoriaGasto"("idCategoria") ON DELETE RESTRICT ON UPDATE CASCADE;
