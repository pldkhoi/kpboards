import Breadcrumbs from '@/components/breadcrumbs';

// ----------------------------------------------------------------------

export interface PageBreadcrumbLink {
  label: string;
  href?: string;
}

interface PageBreadcrumbsProps {
  links: PageBreadcrumbLink[];
}

export default function PageBreadcrumbs({ links }: PageBreadcrumbsProps) {
  return (
    <Breadcrumbs
      links={links.map(({ label, href }) => ({ name: label, href }))}
      activeLast={false}
    />
  );
}
