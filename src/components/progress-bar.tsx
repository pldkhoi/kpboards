import { useNProgress } from '@tanem/react-nprogress';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export function ProgressBarStyle() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          .progress-bar-container {
            pointer-events: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 9999;
          }
          .progress-bar-container .bar {
            top: 0;
            left: 0;
            height: 2px;
            position: absolute;
            background-color: var(--primary, #1ab7ad);
            box-shadow: 0 0 2px var(--primary, #1ab7ad);
          }
          .progress-bar-container .peg {
            right: 0;
            opacity: 1;
            width: 100px;
            height: 100%;
            display: block;
            position: absolute;
            transform: rotate(3deg) translate(0px, -4px);
            box-shadow: 0 0 10px var(--primary, #1ab7ad), 0 0 5px var(--primary, #1ab7ad);
          }
        `,
      }}
    />
  );
}

type ProgressBarProps = {
  isAnimating?: boolean;
};

export default function ProgressBar({ isAnimating = true }: ProgressBarProps) {
  const [animating, setAnimating] = useState(isAnimating);

  // Trigger completion after mount for loading-screen use case
  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => setAnimating(false), 200);
    return () => clearTimeout(timer);
  }, [isAnimating]);

  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: animating,
    animationDuration: 200,
  });

  if (isFinished) return null;

  return (
    <div
      className="progress-bar-container"
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      <div
        className="bar"
        style={{
          width: `${progress * 100}%`,
          transition: `width ${animationDuration}ms linear`,
        }}
      >
        <div className="peg" />
      </div>
    </div>
  );
}
