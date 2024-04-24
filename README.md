# next-sentry-tunnel

Simple solution to use Next.js route handlers for a Sentry tunnel to work around ad blockers.
Based on [Sentry example](https://docs.sentry.io/platforms/javascript/troubleshooting/#using-the-tunnel-option)

This works just using environment variables, no further setup for now.

## Install

Install using your package manager of choice (example has npm):

```bash
npm install next-sentry-tunnel
```

## Usage

First set up the required environment variables:

```bash
SENTRY_HOST=oXXXXXX.ingest.sentry.io
SENTRY_PROJECTS="123456" # Also allows multiple id's comma separated
```

Then set up the handlers in `app/api/tunnel/route.{ts,js}` or your own route of choice:

```typescript
// Route handler file
export { POST } from "next-sentry-tunnel";
```
