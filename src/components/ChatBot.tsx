
// src/components/ChatBot.tsx
import { createSignal, For } from "solid-js";

export default function ChatBot() {
  const [messages, setMessages] = createSignal<string[]>([]);
  const [input, setInput] = createSignal("");

  const handleSend = (e: Event) => {
    e.preventDefault();
    if (!input().trim()) return;
    setMessages([...messages(), input()]);
    setInput("");
    // Simulate a reply
    setTimeout(() => {
      setMessages((prev) => [...prev, "This is an AI response."]);
    }, 600);
  };

  return (
    <main class="container mx-auto px-3 h-screen flex flex-col">
      {/* Chat Area */}
      <div class="flex-1 overflow-y-auto p-3 space-y-3 pb-28">
        <For each={messages()}>
          {(msg, i) => (
            <div class={i() % 2 === 0 ? "text-right" : "text-left"}>
              <div
                class={`inline-block px-4 py-2 rounded-md ${i() % 2 === 0
                  ? "bg-gray-100 text-gray-800"
                  : "bg-white text-black"
                  }`}
              >
                {msg}
              </div>
            </div>
          )}
        </For>
      </div>

      {/* Suggested Questions Bubbles */}
      <div class="sticky bottom-35 bg-white z-10 p-3 flex flex-wrap gap-2">
        <For each={["What is the student's progress?", "What is the student's latest ranking?", "Provide student's psychometric assessment", "How is the attendance?", "Any feedback from teachers?"]}>
          {(question) => (
            <button
              type="button"
              class="cursor-pointer px-3 py-1 bg-gray-200 text-sm rounded-full hover:bg-gray-300"
              onClick={() => setInput(question)}
            >
              {question}
            </button>
          )}
        </For>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSend}
        class="sticky bottom-19 bg-white flex p-3 items-center space-x-3 border-t border-gray-200"
      >
        <input
          type="text"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ask about the student or click any of the predefined questions above ..."
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
        />
        <button
          type="submit"
          class="cursor-pointer px-5 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-400"
        >
          Ask
        </button>
      </form>

      {/* File Link Placeholder */}
      <div class="sticky bottom-12 mt-2 px-3 text-sm text-blue-600 underline">
        {/* You can conditionally render this if a file exists */}
        <a href="/student/uploadfile" target="_blank" rel="noopener noreferrer">
          View student_form_2025.pdf...
        </a>
      </div>

    </main>

  );
}

