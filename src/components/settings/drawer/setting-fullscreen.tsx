import Iconify from '@/components/iconify';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

// ----------------------------------------------------------------------

export default function SettingFullscreen() {
  const { t } = useTranslation();
  const [fullscreen, setFullscreen] = useState(false);
  const isSupported =
    typeof document !== 'undefined' &&
    document.fullscreenEnabled &&
    typeof document.documentElement.requestFullscreen === 'function' &&
    typeof document.exitFullscreen === 'function';

  useEffect(() => {
    const onFullscreenChange = () => {
      setFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    onFullscreenChange();

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!isSupported) {
      toast.error(t('settings.fullscreen.notSupported'));
      return;
    }

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        toast.error(`${t('settings.fullscreen.errorEnable')}: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        toast.error(`${t('settings.fullscreen.errorDisable')}: ${err.message} (${err.name})`);
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full justify-start gap-2 focus-visible:ring-2"
      onClick={toggleFullScreen}
      aria-pressed={fullscreen}
      aria-label={fullscreen ? t('settings.fullscreen.exit') : t('settings.fullscreen.enter')}
      disabled={!isSupported}
    >
      <Iconify
        icon={fullscreen ? 'ic:round-fullscreen-exit' : 'ic:round-fullscreen'}
        width={20}
        height={20}
      />
      {fullscreen ? t('settings.fullscreen.buttonExit') : t('settings.fullscreen.buttonEnter')}
    </Button>
  );
}
