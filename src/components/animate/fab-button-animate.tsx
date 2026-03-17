import { Button } from '@/components/ui/button';
import { m } from 'framer-motion';
import { type ReactNode } from 'react';

// ----------------------------------------------------------------------

type AnimateWrapProp = {
  children: ReactNode;
  size: 'small' | 'medium' | 'large';
  className?: string;
};

const varSmall = {
  hover: { scale: 1.07 },
  tap: { scale: 0.97 },
};

const varMedium = {
  hover: { scale: 1.06 },
  tap: { scale: 0.98 },
};

const varLarge = {
  hover: { scale: 1.05 },
  tap: { scale: 0.99 },
};

function AnimateWrap({ size, children, className }: AnimateWrapProp) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';
  const variants = isSmall ? varSmall : isLarge ? varLarge : varMedium;

  return (
    <m.div
      whileTap="tap"
      whileHover="hover"
      variants={variants}
      className={`inline-flex ${className ?? ''}`}
    >
      {children}
    </m.div>
  );
}

// ----------------------------------------------------------------------

type Props = React.ComponentProps<typeof Button> & {
  ref?: React.RefObject<HTMLButtonElement>;
  sxWrap?: React.CSSProperties;
  color?:
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
};

const FabButtonAnimate = ({
  ref,
  color = 'primary',
  size = 'large',
  children,
  className,
  sxWrap,
  ...other
}: Props) => (
  <AnimateWrap size={size} className={sxWrap ? undefined : undefined}>
    <Button
      ref={ref}
      size={size === 'small' ? 'icon-sm' : size === 'large' ? 'icon-lg' : 'icon'}
      variant={color === 'default' || color === 'inherit' ? 'outline' : 'default'}
      className={className}
      {...other}
    >
      {children}
    </Button>
  </AnimateWrap>
);

export default FabButtonAnimate;
