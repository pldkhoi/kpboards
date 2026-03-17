import { useState } from 'react';
import MotionLazyContainer from './components/animate/motion-lazy-container';
import CommandPalette from './components/command-palette';
import { ProgressBarStyle } from './components/progress-bar';
import ScrollToTop from './components/scroll-to-top';
import ThemeSettings from './components/settings';
import ToasterContainer from './components/toaster-container';
import Router from './routes';

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <MotionLazyContainer>
      <ThemeSettings>
        <ToasterContainer />
        <ProgressBarStyle />
        <ScrollToTop />
        <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
        <Router />
      </ThemeSettings>
    </MotionLazyContainer>
  );
}
