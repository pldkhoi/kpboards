# Deployment Guide

## Build

```bash
yarn build
```

Output is in the `dist/` directory. This is a static site — serve it from any static hosting.

## Vercel

`vercel.json` is pre-configured. One-click deploy:

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Add environment variables in Vercel dashboard
3. Deploy — build command and output directory are set in `vercel.json`

## Netlify

`netlify.toml` is pre-configured. One-click deploy:

1. Connect your GitHub repository to [Netlify](https://netlify.com)
2. Add environment variables in Netlify dashboard
3. Deploy — build command, publish directory, and SPA redirects are set in `netlify.toml`

## Docker

### Build and Run

```bash
docker build -t my-app .
docker run -p 80:80 my-app
```

### Docker Compose

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - '80:80'
    restart: unless-stopped
```

### Environment Variables in Docker

For client-side env vars, you need to inject them at **build time**:

```bash
docker build \
  --build-arg VITE_API_ENDPOINT=https://api.example.com \
  -t my-app .
```

Add to your Dockerfile before the build step:

```dockerfile
ARG VITE_API_ENDPOINT
ENV VITE_API_ENDPOINT=$VITE_API_ENDPOINT
```

## Nginx (Self-Hosted)

The Docker image uses nginx. For manual nginx setup:

1. Build: `yarn build`
2. Copy `dist/` to nginx html directory
3. Use the provided `nginx.conf`:

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
}
```

The `try_files` fallback to `index.html` is required for client-side routing.

## GitHub Actions CI

The included `.github/workflows/ci.yml` runs on push/PR to `main` and `develop`:

1. Install dependencies
2. Audit (yarn audit, fails on critical vulnerabilities)
3. Lint (ESLint)
4. Type check (TypeScript)
5. Build (Vite)
6. Test (Vitest) and coverage
7. E2E (Playwright)

Tests run on Node 20 and 22.

## Environment Variables

Remember:

- All `VITE_*` variables are **public** — they're embedded in the client bundle
- Never put secrets (API keys, database credentials) in `VITE_*` variables
- True secrets should be on the server side only
- See `.env.example` for available variables
