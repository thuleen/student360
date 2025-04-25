import { A } from '@solidjs/router';
import { createSignal } from "solid-js";
import UploadForm from "~/components/UploadForm";
import ChatBot from '~/components/ChatBot';

export default function Student() {
  const [fileSelected, setFileSelected] = createSignal(false);

  const [fileName, setFileName] = createSignal<string | null>(null);

  const [fileAnalyzed, setFileAnalyzed] = createSignal(false);

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      setFileName(input.files[0].name); // Set the selected file name
      setFileSelected(!!input.files?.length);
    }
  };

  const handleClearFile = () => {
    const input = document.getElementById("file-input") as HTMLInputElement;
    if (input) {
      input.value = "";
    }
    setFileName(null);
  };

  return (
    <main class="container mx-auto px-3 pt-16">
      {/* Actions: Search + Upload */}
      <div class="p-6 flex flex-col md:flex-row md:items-center md:space-x-1">
        {/* Search Form */}
        <form class="flex flex-1 gap-2">
          <input
            type="text"
            placeholder="Search student..."
            class="flex-grow px-4 py-2 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            class="h-10 px-4 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center"
          >
            Search
          </button>
          <A
            href="/student/upload"
            class="h-10 px-4 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center"
          >
            Upload Info
          </A>
        </form>
      </div>

      {/* Content below: student table or list goes here */}
    </main>
  )
}