// src/routes/api/ask.ts
import { RequestHandler } from '@solidjs/start';
import { json } from "@solidjs/router";
import { simulateAIResponse } from '~/shared/utils/fakeAI';


const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export const POST: RequestHandler = async ({ request }) => {
  try {
    // simulate delay (e.g., 1500ms = 1.5s)
    await wait(3500);

    const { question } = await request.json();

    const message = simulateAIResponse(question);

    return json({ message });
  } catch (error: any) {
    console.error("Simulated AI error:", error);
    return json({ error: "Failed to simulate AI response." }, { status: 500 });
  }
};