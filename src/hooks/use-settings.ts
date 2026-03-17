import { SettingsContext } from '@/contexts/settings-context';
import { use } from 'react';

// ----------------------------------------------------------------------

const useSettings = () => use(SettingsContext);

export default useSettings;
