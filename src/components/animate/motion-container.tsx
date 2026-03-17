import { m, type MotionProps } from 'framer-motion';
import { varContainer } from './variants';

// ----------------------------------------------------------------------

export interface Props extends MotionProps {
  animate?: boolean;
  action?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function MotionContainer({
  animate,
  action = false,
  children,
  className,
  ...other
}: Props) {
  if (action) {
    return (
      <m.div
        className={className}
        initial={false}
        animate={animate ? 'animate' : 'exit'}
        variants={varContainer()}
        {...other}
      >
        {children}
      </m.div>
    );
  }

  return (
    <m.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer()}
      {...other}
    >
      {children}
    </m.div>
  );
}
