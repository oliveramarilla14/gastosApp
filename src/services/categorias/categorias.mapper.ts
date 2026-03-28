import { CategoriaType } from '@/entites/types/categoria.type';
import { IconName, iconNames } from '@/lib/icons';
import { CategoriaGasto } from '../../../generated/prisma/client';

export function mapCategoriaToType(categoria: CategoriaGasto): CategoriaType {
  const icon = (iconNames as readonly string[]).includes(categoria.icon)
    ? (categoria.icon as IconName)
    : 'help-circle';

  return {
    idCategoria: categoria.idCategoria,
    nombre: categoria.nombre,
    icon,
    createdAt: categoria.createdAt.toISOString()
  };
}
