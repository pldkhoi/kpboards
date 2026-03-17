import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useSettings from '@/hooks/use-settings';

// ----------------------------------------------------------------------

interface Props {
  className?: string;
}

export default function SettingsShowcaseSection({ className }: Props) {
  const {
    themeMode,
    themeColorPresets,
    themeLayout,
    themeContrast,
    themeDirection,
    themeFontSize,
    themeStretch,
  } = useSettings();

  return (
    <section className={className}>
      <div className="space-y-6">
        <div>
          <h2 id="settings" className="text-xl font-semibold tracking-tight">
            Settings (live)
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Theme toggles, color presets, layout options. Open the Settings drawer (gear icon on the
            right) to change these values.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current theme settings</CardTitle>
            <CardDescription>
              Open the Settings drawer (gear icon on the right edge) to change these.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">themeMode: {themeMode}</Badge>
              <Badge variant="secondary">themeColorPresets: {themeColorPresets}</Badge>
              <Badge variant="secondary">themeLayout: {themeLayout}</Badge>
              <Badge variant="secondary">themeContrast: {themeContrast}</Badge>
              <Badge variant="secondary">themeDirection: {themeDirection}</Badge>
              <Badge variant="secondary">themeFontSize: {themeFontSize}</Badge>
              <Badge variant="secondary">themeStretch: {themeStretch ? 'true' : 'false'}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
