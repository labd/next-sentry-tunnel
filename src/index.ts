/**
 * POST endpoint that acts as a tunnel for Sentry's ingestion API.
 * It checks whether the DSN and project is allowed to post to Sentry.
 */
export async function POST(request: Request) {
  try {
    const envelope = await request.text();
    const piece = envelope.split("\n")[0];
    const header = JSON.parse(piece);
    const dsn = new URL(header["dsn"]);
    const projectId = dsn.pathname?.replace("/", "");

    const allowedProjects = process.env.SENTRY_PROJECTS.split(",");

    if (dsn.hostname !== process.env.SENTRY_HOST) {
      throw new Error(`Invalid Sentry DSN: ${dsn.hostname}`);
    }

    if (!projectId || allowedProjects.includes(projectId)) {
      throw new Error(`Invalid Sentry DSN: ${dsn.pathname}`);
    }

    const upstream_sentry_url = `https://${process.env.SENTRY_HOST}/api/${projectId}/envelope/`;
    await fetch(upstream_sentry_url, { method: "POST", body: envelope });

    return new Response("", {
      status: 201,
      statusText: "Created",
    });
  } catch (err) {
    return new Response(err.message || err.toString(), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

/**
 *
 * @param request
 * @todo Not sure if this is needed, or if not adding it will return a 405
 */
export async function GET(request: Request) {
  return new Response("", {
    status: 405,
    statusText: "Method Not Allowed",
  });
}
