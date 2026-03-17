import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-4 text-4xl font-bold">Page Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps you&apos;ve
          mistyped the URL? Be sure to check your spelling.
        </p>
        <img
          src="/assets/illustrations/illustration_404.svg"
          alt="404"
          className="mx-auto mb-8 h-[260px]"
        />
        <Link
          to="/"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
