import { Car, CircleDollarSign, CreditCard, HelpCircle, Home, Lightbulb, PiggyBank, ShoppingCart } from 'lucide-react';

const iconMap = {
  home: Home,
  car: Car,
  lightbulb: Lightbulb,
  'shopping-cart': ShoppingCart,
  creditCard: CreditCard,
  dollar: CircleDollarSign,
  piggy: PiggyBank
} as const;

export type IconName = keyof typeof iconMap;

export function mapIcon(iconName: IconName) {
  return iconMap[iconName] ?? HelpCircle;
}
