import Logo from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import { HEADER } from '@/config';
import useResponsive from '@/hooks/use-responsive';
import { PATH_PAGE } from '@/routes/paths';
import { Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router';
import MainHeader from './main-header';

export default function MainLayout() {
  const isDesktop = useResponsive('up', 'md');
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <MainHeader />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[1200] -translate-y-16 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {t('landing.header.skipToContent')}
      </a>

      <main
        id="main-content"
        className="w-full flex-1"
        role="main"
        style={{
          paddingTop: isDesktop ? HEADER.MAIN_DESKTOP_HEIGHT + 22 : HEADER.MOBILE_HEIGHT + 22,
        }}
      >
        <Outlet />
      </main>

      <footer className="relative mt-20 overflow-hidden border-t border-border/60 bg-[color:color-mix(in_srgb,var(--background)_84%,transparent)]">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent"
        />
        <div
          aria-hidden
          className="absolute -left-8 top-10 size-40 rounded-full bg-[color:color-mix(in_srgb,var(--primary)_16%,transparent)] blur-3xl"
        />
        <div
          aria-hidden
          className="absolute bottom-0 right-0 size-48 rounded-full bg-[color:color-mix(in_srgb,var(--primary-strong)_16%,transparent)] blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)] lg:gap-12">
            <div className="space-y-4">
              <Logo className="text-foreground" />
              <div className="space-y-2">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {t('landing.footer.brandTitle')}
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  {t('landing.footer.brandDescription')}
                </p>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <nav aria-label={t('landing.footer.quickLinks.title')}>
                <h3 className="text-sm font-semibold text-foreground">
                  {t('landing.footer.quickLinks.title')}
                </h3>
                <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                  <li>
                    <Link className="transition-colors hover:text-foreground" to={PATH_PAGE.home}>
                      {t('landing.footer.quickLinks.home')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition-colors hover:text-foreground"
                      to={PATH_PAGE.portfolio}
                    >
                      {t('landing.footer.quickLinks.portfolio')}
                    </Link>
                  </li>
                  <li>
                    <Link className="transition-colors hover:text-foreground" to={PATH_PAGE.pages}>
                      {t('landing.footer.quickLinks.pages')}
                    </Link>
                  </li>
                </ul>
              </nav>

              <nav aria-label={t('landing.footer.resources.title')}>
                <h3 className="text-sm font-semibold text-foreground">
                  {t('landing.footer.resources.title')}
                </h3>
                <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                  <li>
                    <Link className="transition-colors hover:text-foreground" to={PATH_PAGE.login}>
                      {t('landing.footer.resources.admin')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition-colors hover:text-foreground"
                      to={PATH_PAGE.components}
                    >
                      {t('landing.footer.quickLinks.components')}
                    </Link>
                  </li>
                </ul>
              </nav>

              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {t('landing.footer.contact.title')}
                </h3>
                <div className="mt-3 space-y-2.5">
                  <a
                    href="mailto:pldkhoi@gmail.com"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <Mail className="size-4 shrink-0" aria-hidden />
                    <span className="sr-only">{t('landing.footer.contact.email')}</span>
                    pldkhoi@gmail.com
                  </a>
                  <a
                    href="tel:0901430110"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <Phone className="size-4 shrink-0" aria-hidden />
                    <span className="sr-only">{t('landing.footer.contact.phone')}</span>
                    090-143-0110
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-border/70" />

          <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>{t('landing.footer.copyright', { year: currentYear })}</span>
            <div className="flex items-center gap-4">
              <Link
                className="transition-colors hover:text-foreground"
                to={PATH_PAGE.privacyPolicy}
              >
                {t('landing.footer.legal.privacy')}
              </Link>
              <Link
                className="transition-colors hover:text-foreground"
                to={PATH_PAGE.termsAndConditions}
              >
                {t('landing.footer.legal.terms')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
