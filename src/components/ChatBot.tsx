import { createSignal, For } from "solid-js";
import { Plus, ArrowUp } from "lucide-solid";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function ChatBot() {
  const [messages, setMessages] = createSignal<Message[]>([]);
  const [input, setInput] = createSignal("");
  const [file, setFile] = createSignal<File | null>(null);

  const handleSend = (e: Event) => {
    e.preventDefault();
    const userInput = input().trim();
    if (!userInput && !file()) return;

    setMessages([
      ...messages(),
      { from: "user", text: userInput || (file() ? `Uploaded: ${file()?.name}` : "") },
    ]);
    setInput("");
    setFile(null);

    setTimeout(() => {
      const response = `AI Response to: ${userInput || file()?.name}`;
      setMessages((prev) => [...prev, { from: "bot", text: response }]);
    }, 600);
  };

  return (
    <main class="container mx-auto pt-21 px-3 h-screen flex flex-col">
      {/* Chat Area */}
      <div class="flex-1 p-3 space-y-3 pb-36">
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
      <div class="sticky bottom-45 bg-white z-10 p-3 flex flex-wrap gap-2">
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

      {/* Input Panel */}
      <form
        onSubmit={handleSend}
        class="sticky bottom-9 bg-white p-3"
      >
        <div class="w-full border border-gray-300 rounded-xl p-3 flex flex-col gap-3">
          {/* Text input */}
          <input
            type="text"
            class="w-full border-none focus:outline-none focus:ring-0 p-3"
            placeholder="Ask something..."
            value={input()}
            onInput={(e) => setInput(e.currentTarget.value)}
          />

          {/* File name preview */}
          {file() && (
            <div class="text-sm text-gray-500">
              📎 {file()?.name}
            </div>
          )}

          {/* Bottom action row */}
          <div class="flex items-center justify-between pt-2 border-t border-gray-200">
            <div class="flex items-center gap-3">
              {/* Upload Button */}
              <input
                id="file-upload"
                type="file"
                class="hidden"
                onChange={(e) => setFile(e.currentTarget.files?.[0] || null)}
              />
              <label
                for="file-upload"
                class="cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-gray-100 border border-gray-300 rounded-full"
              >
                <Plus class="w-4 h-4" />
              </label>
            </div>
            {/* Send Button */}
            <button
              type="submit"
              class="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
            >
              <ArrowUp class="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
