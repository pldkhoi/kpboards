import { cn } from '@/lib/utils';
import { LazyLoadImage, type LazyLoadImageProps } from 'react-lazy-load-image-component';

function getRatio(ratio = '1/1') {
  return {
    '4/3': 'calc(100% / 4 * 3)',
    '3/4': 'calc(100% / 3 * 4)',
    '6/4': 'calc(100% / 6 * 4)',
    '4/6': 'calc(100% / 4 * 6)',
    '16/9': 'calc(100% / 16 * 9)',
    '9/16': 'calc(100% / 9 * 16)',
    '21/9': 'calc(100% / 21 * 9)',
    '9/21': 'calc(100% / 9 * 21)',
    '1/1': '100%',
  }[ratio];
}

export type ImageRato = '4/3' | '3/4' | '6/4' | '4/6' | '16/9' | '9/16' | '21/9' | '9/21' | '1/1';

interface Props extends LazyLoadImageProps {
  ratio?: ImageRato;
  disabledEffect?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Image({
  ratio,
  disabledEffect = false,
  effect = 'blur',
  className,
  style,
  ...other
}: Props) {
  if (ratio) {
    return (
      <span
        className={cn('block w-full overflow-hidden', className)}
        style={{
          lineHeight: 0,
          position: 'relative',
          paddingTop: getRatio(ratio),
          ...style,
        }}
      >
        <LazyLoadImage
          wrapperClassName="absolute inset-0 block size-full bg-cover"
          effect={disabledEffect ? undefined : effect}
          placeholderSrc="/assets/placeholder.svg"
          className="size-full object-cover"
          {...other}
        />
      </span>
    );
  }

  return (
    <span className={cn('block overflow-hidden', className)} style={{ lineHeight: 0, ...style }}>
      <LazyLoadImage
        wrapperClassName="block size-full bg-cover"
        effect={disabledEffect ? undefined : effect}
        placeholderSrc="/assets/placeholder.svg"
        className="size-full object-cover"
        {...other}
      />
    </span>
  );
}
