import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { type TypographyVariantType } from '@/types/typography';
import GetFontValue from '@/utils/get-font-value';
import { type ReactNode } from 'react';

// ----------------------------------------------------------------------

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  line?: number;
  asLink?: boolean;
  persistent?: boolean;
  children: ReactNode;
  variant?: TypographyVariantType;
}

const TextMaxLine = ({
  ref,
  asLink,
  variant = 'body1',
  line = 2,
  persistent = false,
  children,
  style,
  className,
  ...other
}: Props & {
  ref?: React.RefObject<HTMLAnchorElement | HTMLSpanElement>;
}) => {
  const { lineHeight } = GetFontValue(variant);
  const clampStyle: React.CSSProperties = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    whiteSpace: 'normal',
    wordBreak: 'break-all',
    WebkitLineClamp: line,
    WebkitBoxOrient: 'vertical',
    ...(persistent && { minHeight: lineHeight * line }),
    ...style,
  };

  const content = (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {asLink ? (
            <a
              ref={ref as React.RefObject<HTMLAnchorElement>}
              style={clampStyle}
              className={className}
              {...(other as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
              {children}
            </a>
          ) : (
            <span
              ref={ref as React.RefObject<HTMLSpanElement>}
              style={clampStyle}
              className={className}
              {...other}
            >
              {children}
            </span>
          )}
        </TooltipTrigger>
        <TooltipContent side="top">{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return content;
};

export default TextMaxLine;
