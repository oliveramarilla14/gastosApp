import { Car, CircleDollarSign, CreditCard, HelpCircle, Home, Lightbulb, PiggyBank, ShoppingCart } from 'lucide-react';

export const iconNames = ['home', 'car', 'lightbulb', 'shopping-cart', 'creditCard', 'dollar', 'piggy', 'help-circle'] as const;

const iconMap = {
  home: Home,
  car: Car,
  lightbulb: Lightbulb,
  'shopping-cart': ShoppingCart,
  creditCard: CreditCard,
  dollar: CircleDollarSign,
  piggy: PiggyBank,
  'help-circle': HelpCircle
} as const;

export type IconName = keyof typeof iconMap;

export function mapIcon(iconName: IconName) {
  return iconMap[iconName];
}
