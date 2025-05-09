// src/shared/utils/fakeAI.ts
import { faker } from '@faker-js/faker';

export function simulateAIResponse(question: string): string {
  const intro = [
    `Great question about "${question}".`,
    `Here's a simulated answer to "${question}":`,
    `Thinking through "${question}"...`,
    `Exploring "${question}" as if I were an AI:`,
  ];

  const body = faker.lorem.paragraphs(1);

  const randomIntro = intro[Math.floor(Math.random() * intro.length)];
  return `${randomIntro} ${body}`;
}
