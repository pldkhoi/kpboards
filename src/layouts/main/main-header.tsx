import Logo from '@/components/logo';
import { buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { HEADER } from '@/config';
import useOffSetTop from '@/hooks/use-off-set-top';
import useResponsive from '@/hooks/use-responsive';
import { cn } from '@/lib/utils';
import { PATH_PAGE } from '@/routes/paths';
import { ArrowRightIcon, MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router';

const NAV_LINKS = [
  { key: 'home', path: PATH_PAGE.home },
  { key: 'portfolio', path: PATH_PAGE.portfolio },
  { key: 'pages', path: PATH_PAGE.pages },
] as const;

const desktopNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    buttonVariants({ variant: 'ghost', size: 'sm' }),
    'h-10 rounded-full px-4 text-[0.92rem] text-muted-foreground shadow-none hover:bg-[color:color-mix(in_srgb,var(--card)_84%,transparent)] hover:text-foreground',
    isActive &&
      'bg-[color:color-mix(in_srgb,var(--card)_96%,transparent)] text-foreground shadow-[0_18px_44px_-30px_color-mix(in_srgb,var(--foreground)_28%,transparent)]'
  );

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    buttonVariants({ variant: 'ghost' }),
    'h-12 w-full justify-start rounded-2xl px-4 text-left text-foreground shadow-none',
    isActive
      ? 'bg-[color:color-mix(in_srgb,var(--primary)_12%,var(--card))] text-primary'
      : 'hover:bg-[color:color-mix(in_srgb,var(--card)_90%,transparent)]'
  );

export default function MainHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDesktop = useResponsive('up', 'md');
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);
  const { t } = useTranslation();

  const headerShellClass = cn(
    'mx-auto flex w-full max-w-6xl items-center rounded-[30px] border px-3 shadow-[0_28px_90px_-56px_color-mix(in_srgb,var(--foreground)_40%,transparent)] backdrop-blur-xl transition-[background-color,border-color,box-shadow,transform] duration-300 md:px-4',
    isOffset
      ? 'border-border/85 bg-[color:color-mix(in_srgb,var(--background)_90%,transparent)] shadow-[0_38px_110px_-60px_color-mix(in_srgb,var(--foreground)_45%,transparent)]'
      : 'border-border/60 bg-[color:color-mix(in_srgb,var(--background)_72%,transparent)]'
  );

  const renderMenuItems = (mode: 'desktop' | 'mobile') =>
    NAV_LINKS.map(({ key, path }) => (
      <NavLink
        key={path}
        to={path}
        className={mode === 'desktop' ? desktopNavLinkClass : mobileNavLinkClass}
        onClick={mode === 'mobile' ? () => setMobileMenuOpen(false) : undefined}
      >
        {t(`landing.header.nav.${key}`)}
      </NavLink>
    ));

  const renderActionItems = (mode: 'desktop' | 'mobile') => {
    const isMobile = mode === 'mobile';
    const handleMobileClose = isMobile ? () => setMobileMenuOpen(false) : undefined;

    return (
      <>
        <Link
          to={PATH_PAGE.login}
          className={cn(
            buttonVariants({ size: isMobile ? 'default' : 'sm' }),
            isMobile ? 'w-full rounded-2xl' : 'min-w-[132px] rounded-full px-5'
          )}
          onClick={handleMobileClose}
        >
          {t('landing.header.actions.signIn')}
          <ArrowRightIcon className="size-4" aria-hidden />
        </Link>
      </>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[1100] px-4 pt-4 md:px-6" role="banner">
      <div
        className={headerShellClass}
        style={{ height: isDesktop ? HEADER.MAIN_DESKTOP_HEIGHT : HEADER.MOBILE_HEIGHT + 10 }}
      >
        <div className="flex w-full items-center gap-3 px-2 py-2 md:px-1">
          <Logo className="text-foreground" />

          {isDesktop ? (
            <>
              <nav
                className="ml-5 flex items-center gap-2"
                aria-label={t('landing.header.nav.mainAria')}
              >
                {renderMenuItems('desktop')}
              </nav>

              <div className="flex-1" />

              <div className="flex items-center gap-3">{renderActionItems('desktop')}</div>
            </>
          ) : (
            <>
              <div className="flex-1" />
              <button
                type="button"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'icon-sm' }),
                  'rounded-full border-border/80 bg-[color:color-mix(in_srgb,var(--card)_88%,transparent)]'
                )}
                aria-label={t('landing.header.mobile.openMenu')}
                onClick={() => setMobileMenuOpen(true)}
              >
                <MenuIcon className="size-5" aria-hidden />
              </button>
            </>
          )}
        </div>
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="right"
          className="w-[320px] border-l border-border/70 bg-[color:color-mix(in_srgb,var(--background)_95%,transparent)] px-0 pt-12 backdrop-blur-2xl"
        >
          <div className="space-y-6 px-5">
            <div className="space-y-2">
              <Logo className="text-foreground" disabledLink />
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {t('landing.footer.brandDescription')}
              </p>
            </div>

            <nav className="flex flex-col gap-2" aria-label={t('landing.header.nav.mobileAria')}>
              {renderMenuItems('mobile')}
            </nav>

            <div className="space-y-3 border-t border-border/60 pt-5">
              {renderActionItems('mobile')}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
