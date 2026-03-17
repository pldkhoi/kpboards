import useResponsive from '@/hooks/use-responsive';
import { m, type MotionProps } from 'framer-motion';
import { type ReactNode } from 'react';
import { varContainer } from './variants';

// ----------------------------------------------------------------------

interface Props extends MotionProps {
  children: ReactNode;
  disableAnimatedMobile?: boolean;
  className?: string;
}

export default function MotionViewport({
  children,
  disableAnimatedMobile = true,
  className,
  ...other
}: Props) {
  const isDesktop = useResponsive('up', 'sm');

  if (!isDesktop && disableAnimatedMobile) {
    return (
      <div className={className} {...other}>
        {children}
      </div>
    );
  }

  return (
    <m.div
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </m.div>
  );
}
