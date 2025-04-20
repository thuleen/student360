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
    <main class="mx-auto text-gray-700">
      {!fileAnalyzed() ? (
        <>
          <form action="/api/upload" method="post" enctype="multipart/form-data">
            <UploadForm
              fileName={fileName}
              fileSelected={fileSelected}
              handleFileChange={handleFileChange}
              handleClearFile={handleClearFile}
            />
          </form>
          <div class="container mx-auto px-3">
            <button class="text-sm text-gray-400" onClick={() => setFileAnalyzed(true)}>Test chatbot</button>
          </div>
        </>
      ) : (
        <ChatBot />
      )}
    </main>

  )
}