import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'div'> & { text?: string };

/**
 * 
 * Based in Skeleton from Shadcn UI, but with text in the middle and not animated
 */
export default function Placeholder({ className, text, ...props }: Props) {
  return <div className={cn('rounded-md bg-muted items-center flex justify-center', className)} {...props} >
    {text }
  </div>;
}
