import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { isValidElement, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[calc(var(--radius)*0.9)] border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap text-current shadow-[0_1px_0_rgba(255,255,255,0.18)_inset] transition-[transform,box-shadow,background-color,border-color,color] duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_20px_45px_-24px_color-mix(in_srgb,var(--primary)_72%,transparent)] hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--primary)_90%,white)] hover:shadow-[0_24px_50px_-24px_color-mix(in_srgb,var(--primary)_82%,transparent)]',
        outline:
          'border-border/80 bg-card/85 text-foreground shadow-[0_18px_40px_-28px_rgba(15,35,32,0.3)] hover:-translate-y-0.5 hover:border-primary/25 hover:bg-accent/80 hover:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[0_20px_45px_-24px_rgba(18,53,72,0.72)] hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--secondary)_88%,white)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'text-foreground/80 hover:bg-card hover:text-foreground hover:shadow-[0_16px_36px_-28px_rgba(15,35,32,0.28)] aria-expanded:bg-card aria-expanded:text-foreground',
        destructive:
          'bg-destructive text-white shadow-[0_18px_40px_-26px_rgba(212,74,65,0.75)] hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--destructive)_90%,white)] focus-visible:border-destructive/40 focus-visible:ring-destructive/20',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-10 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        xs: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 rounded-[min(var(--radius-md),14px)] px-3 text-[0.85rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-11 gap-2 px-5 text-[0.95rem] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4',
        icon: 'size-10',
        'icon-xs':
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-9 rounded-[min(var(--radius-md),14px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  nativeButton,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    children?: ReactNode;
  }) {
  if (asChild && isValidElement(children)) {
    const childElement = children;
    const childProps = childElement.props as { children?: ReactNode } | undefined;
    const isNativeButtonElement =
      typeof childElement.type === 'string' && childElement.type === 'button';

    return (
      <ButtonPrimitive
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        nativeButton={nativeButton ?? isNativeButtonElement}
        render={childElement}
        {...props}
      >
        {childProps?.children}
      </ButtonPrimitive>
    );
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      nativeButton={nativeButton}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- variant export is consumed by non-component modules.
export { Button, buttonVariants };
