// src/routes/api/upload-file.ts

import { RequestHandler } from '@solidjs/start';

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('file');
  const question = formData.get('question');

  // For now, just return a response that everything worked
  return new Response(
    JSON.stringify({ message: 'File uploaded successfully' }),
    { status: 200 }
  );
};
