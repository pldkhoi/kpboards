import PageBreadcrumbs from '@/components/page-breadcrumbs';
import PageHeader from '@/components/page-header';
import { PATH_PAGE } from '@/routes/paths';
import {
  BadgeSection,
  ButtonSection,
  CardSection,
  CrudPatternsSection,
  FeedbackSection,
  FormSection,
  NavigationSection,
  OverlaySection,
  SettingsShowcaseSection,
  TableSection,
} from 'features/components-showcase';

// ----------------------------------------------------------------------

export default function ComponentsShowcasePage() {
  return (
    <div className="space-y-10 p-6">
      <PageBreadcrumbs
        links={[
          { label: 'Home', href: PATH_PAGE.home },
          { label: 'Admin Dashboard', href: PATH_PAGE.adminDashboard },
          { label: 'Components' },
        ]}
      />

      <PageHeader
        title="Component Showcase"
        description="Live examples of shadcn/ui components and patterns. Each section includes variants, states, real-world demos, and copy-paste snippets. Use these as reference for building your own UIs."
      />

      <div className="space-y-12 pt-4">
        <ButtonSection />
        <FormSection />
        <BadgeSection />
        <CardSection />
        <CrudPatternsSection />
        <NavigationSection />
        <FeedbackSection />
        <TableSection />
        <OverlaySection />
        <SettingsShowcaseSection />
      </div>
    </div>
  );
}
