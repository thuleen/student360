import { createSignal, For } from "solid-js";
import { Plus, ArrowUp, X } from "lucide-solid";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function ChatBot() {
  const [messages, setMessages] = createSignal<Message[]>([]);
  const [input, setInput] = createSignal("");
  const [file, setFile] = createSignal<File | null>(null);
  const [loading, setLoading] = createSignal(false);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  const handleSend = async (e: Event) => {
    e.preventDefault();
    const userInput = input().trim();
    if (!userInput && !file()) return;

    if (userInput && !file()) {
      setMessages(prev => [...prev, { from: "user", text: userInput }]);
      setInput("");
      console.log("fetch api/ask-ai");
      return;
    }

    setLoading(true);

    try {
      const fileData = file() ? await fileToBase64(file()!) : null;
      const response = await fetch('/api/upload-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: fileData,
          question: userInput,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      // Future: Show bot's reply from API here

      if (file()) {
        setMessages(prev => [...prev, { from: "bot", text: `Successfully uploaded file ${file().name}` }]);
        setFile(null);
      }

      if (userInput) {
        setMessages(prev => [...prev, { from: "user", text: userInput }]);
        setInput("");
      }

      await new Promise((r) => setTimeout(r, 3500));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const truncateFileName = (name: string, maxLength = 30) => {
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
  };

  return (
    <main class="container mx-auto pt-21 px-3 h-screen flex flex-col">
      {/* Chat Area */}
      <div class="flex-1 p-3 space-y-3 pb-36 overflow-y-auto">
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

      {/* Input Panel */}
      <form
        onSubmit={handleSend}
        class="sticky bottom-9 bg-white p-3"
      >
        <div class="w-full border border-gray-300 rounded-xl p-3 flex flex-col gap-3">
          {/* Text input */}
          <input
            type="text"
            class="w-full border-none focus:outline-none focus:ring-0 p-3 disabled:opacity-50"
            placeholder={loading() ? "Uploading..." : "Ask something..."}
            value={input()}
            onInput={(e) => setInput(e.currentTarget.value)}
            disabled={loading()}
          />

          {/* File name preview */}
          {file() && (
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <span>📎</span>
              <span title={file()?.name}>
                {truncateFileName(file()?.name || "")}
              </span>
              <button
                type="button"
                onClick={handleFileRemove}
                class="cursor-pointer text-gray-400 hover:text-gray-700"
                aria-label="Remove file"
                disabled={loading()}
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Bottom action row */}
          <div class="flex items-center justify-between pt-2 border-t border-gray-200">
            {/* Upload Button */}
            <div class="flex items-center gap-3">
              <input
                id="file-upload"
                type="file"
                class="hidden"
                onChange={(e) => setFile(e.currentTarget.files?.[0] || null)}
                disabled={loading()}
              />
              <label
                for="file-upload"
                class={`cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-gray-100 border border-gray-300 rounded-full ${loading() ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Plus class="w-4 h-4" />
              </label>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              class={`bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 ${loading() ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading()}
            >
              {loading() ? (
                <div class="w-5 h-5 animate-spin border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <ArrowUp class="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
