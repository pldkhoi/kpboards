import { m, type MotionProps } from 'framer-motion';
import { varFade } from './variants';

// ----------------------------------------------------------------------

interface TextAnimateProps extends MotionProps {
  text: string;
  variants?: Record<string, unknown>;
  className?: string;
}

export default function TextAnimate({ text, variants, className, ...other }: TextAnimateProps) {
  return (
    <m.h1
      className={`overflow-hidden inline-flex text-4xl font-light ${className ?? ''}`}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </m.h1>
  );
}
