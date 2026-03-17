import useSettings from '@/hooks/use-settings';
import { Toaster } from 'sonner';

// ----------------------------------------------------------------------

export default function ToasterContainer() {
  const { themeMode, themeDirection } = useSettings();

  return (
    <Toaster theme={themeMode} dir={themeDirection} position="top-right" richColors closeButton />
  );
}
