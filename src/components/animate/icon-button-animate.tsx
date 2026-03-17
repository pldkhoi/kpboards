import { Button } from '@/components/ui/button';
import { m } from 'framer-motion';
import { type ReactNode } from 'react';

// ----------------------------------------------------------------------

type AnimateWrapProp = {
  children: ReactNode;
  size: 'small' | 'medium' | 'large';
};

const varSmall = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

const varMedium = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 },
};

const varLarge = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 },
};

function AnimateWrap({ size, children }: AnimateWrapProp) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';
  const variants = isSmall ? varSmall : isLarge ? varLarge : varMedium;

  return (
    <m.div whileTap="tap" whileHover="hover" variants={variants} className="inline-flex">
      {children}
    </m.div>
  );
}

// ----------------------------------------------------------------------

type Props = React.ComponentProps<typeof Button> & {
  ref?: React.RefObject<HTMLButtonElement>;
};

const IconButtonAnimate = ({ ref, children, size = 'medium', className, ...other }: Props) => (
  <AnimateWrap size={size as 'small' | 'medium' | 'large'}>
    <Button
      ref={ref}
      size={size === 'small' ? 'icon-xs' : size === 'large' ? 'icon-lg' : 'icon'}
      variant="ghost"
      className={className}
      {...other}
    >
      {children}
    </Button>
  </AnimateWrap>
);

export default IconButtonAnimate;
