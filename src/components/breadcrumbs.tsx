import { TextMaxLine } from '@/components';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { type ReactElement } from 'react';
import { Link as RouterLink } from 'react-router';

// ----------------------------------------------------------------------

type TLink = {
  href?: string;
  name: string;
  icon?: ReactElement;
  onClick?: () => void;
};

type LinkItemProps = {
  link: TLink;
};

function LinkItem({ link }: LinkItemProps) {
  const { href, name, icon, onClick } = link;
  return (
    <BreadcrumbItem>
      <BreadcrumbLink render={<RouterLink to={href || '#'} onClick={onClick} />}>
        {icon && <span className="mr-1 flex [&>svg]:size-4">{icon}</span>}
        {name}
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
}

// ----------------------------------------------------------------------

export interface Props {
  links: TLink[];
  activeLast?: boolean;
  maxItems?: number;
  sx?: React.CSSProperties;
}

export default function Breadcrumbs({ links, activeLast = false }: Props) {
  const currentLink = links[links.length - 1]?.name;

  const elements: React.ReactNode[] = [];
  links.forEach((link, index) => {
    if (index > 0) elements.push(<BreadcrumbSeparator key={`sep-${link.name}`} />);
    elements.push(
      link.name !== currentLink || activeLast ? (
        <LinkItem key={link.name} link={link} />
      ) : (
        <BreadcrumbItem key={link.name}>
          <BreadcrumbPage>
            <TextMaxLine variant="body2" line={1} className="max-w-[260px] text-muted-foreground">
              {currentLink}
            </TextMaxLine>
          </BreadcrumbPage>
        </BreadcrumbItem>
      )
    );
  });

  return (
    <Breadcrumb className="mb-3">
      <BreadcrumbList
        className={cn(
          'inline-flex rounded-full border border-white/50 bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-[0_12px_28px_-22px_rgba(13,28,22,0.35)] backdrop-blur-md'
        )}
      >
        {elements}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
