// src/routes/api/session.ts
import { RequestHandler } from '@solidjs/start';
import { json } from "@solidjs/router";

export const POST: RequestHandler = async ({ request }) => {
  // const sessionId = crypto.randomUUID();
  const sessionId = "12345";
  // Optionally store sessionId in DB or memory
  // Example: await db.createSession({ sessionId, createdAt: new Date() });
  return json({ sessionId });
}
