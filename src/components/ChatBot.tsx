import { createSignal, For } from "solid-js";
import { Plus } from "lucide-solid";

export default function ChatBot() {
  // const [messages, setMessages] = createSignal<{ from: "user" | "bot"; text: string }[]>([]);
  const [messages, setMessages] = createSignal<string[]>([]);
  const [input, setInput] = createSignal("");
  const [file, setFile] = createSignal<File | null>(null);

  const handleSend = (e: Event) => {
    e.preventDefault();
    const userInput = input().trim();
    if (!userInput && !file()) return;

    // Append user message
    setMessages([...messages(), { from: "user", text: userInput }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const response = `${userInput}${file() ? ` with file: ${file()?.name}` : ""}`;
      setMessages((prev) => [...prev, { from: "bot", text: response }]);
    }, 600);
  };

  return (
    <main class="container mx-auto px-3 h-screen flex flex-col">
      {/* Chat Area */}
      <div class="flex-1 overflow-y-auto p-3 space-y-3 pb-36">
        <For each={messages()}>
          {(msg) => (
            <div class={msg.from === "user" ? "text-right" : "text-left"}>
              <div
                class={`inline-block px-4 py-2 rounded-md ${msg.from === "user"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-white text-black"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          )}
        </For>
      </div>
      {/* Suggested Questions */}
      <div class="sticky bottom-50 bg-white z-10 p-3 flex flex-wrap gap-2">
        <For
          each={[
            "What is the student progress",
            "What is the student latest ranking",
            "Provide student psychometric assessment",
            "How is the attendance",
            "Any feedback from teachers",
          ]}
        >
          {(question) => (
            <button
              type="button"
              class="cursor-pointer px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200"
              onClick={() => setInput(question)}
            >
              {question}
            </button>
          )}
        </For>
      </div>
      {/* Input Area */}
      <form
        onSubmit={handleSend}
        class="sticky bottom-17 bg-white flex flex-col p-3 gap-5"
      >
        <input
          type="text"
          class="border border-gray-300 p-3 rounded"
          placeholder="Ask something..."
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
        />

        <div class="flex items-center justify-between">
          {/* Upload Button */}
          <div>
            <input
              id="file-upload"
              type="file"
              class="hidden"
              onChange={(e) => setFile(e.currentTarget.files?.[0] || null)}
            />
            <label
              for="file-upload"
              class="cursor-pointer w-10 h-10 flex items-center justify-center hover:bg-gray-100 border border-gray-300 rounded-full"
            >
              <Plus class="w-5 h-5" />
            </label>
          </div>
          {/* Send Button */}
          <button
            type="submit"
            class="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-400"
          >
            Ask
          </button>
        </div>
      </form>

    </main>
  );
}

