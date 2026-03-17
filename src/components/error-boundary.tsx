import { Button } from '@/components/ui/button';
import { log } from '@/utils/logger';
import { AlertTriangleIcon } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    log.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="mx-auto max-w-xl px-4 py-10">
          <div className="rounded-[calc(var(--radius)*1.4)] border border-border/70 bg-card/85 p-8 text-center shadow-[0_28px_70px_-44px_rgba(13,28,22,0.42)] backdrop-blur-md">
            <div className="mx-auto mb-5 inline-flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangleIcon className="size-8" />
            </div>
            <h1 className="mb-2 text-3xl font-semibold tracking-tight">Something went wrong</h1>
            <p className="mx-auto mb-5 max-w-md text-sm leading-6 text-muted-foreground">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <div className="flex justify-center gap-3">
              <Button size="lg" onClick={this.handleReset}>
                Try Again
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.location.reload()}>
                Reload App
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
