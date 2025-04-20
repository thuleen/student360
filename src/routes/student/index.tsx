import { A } from '@solidjs/router';
import { createSignal } from "solid-js";

export default function Student() {
  const [fileSelected, setFileSelected] = createSignal(false);

  const [fileName, setFileName] = createSignal<string | null>(null);

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
    <main class="text-center mx-auto text-gray-700 px-10 lg:px-32">
      <h1 class="text-4xl text-sky-700 font-thin uppercase my-16">Student</h1>

      <form action="/api/upload" method="post" enctype="multipart/form-data">
        <div class="my-16">
          <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
            <div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 px-7">
              PDF
            </div>

            <input
              type="file"
              name="pdf"
              accept="application/pdf"
              id="file-input"
              class="hidden"
              onChange={handleFileChange}
            />

            <label
              for="file-input"
              class="cursor-pointer py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded-l-md"
            >
              Select ...
            </label>

            {/* Display the file name in between the buttons */}
            {fileName() && (
              <div class="mx-4 text-gray-700 text-sm">
                {fileName()}
              </div>
            )}

            <div class="flex-grow"></div>

            {fileSelected() && (
              <button
                type="button"
                onClick={handleClearFile}
                class="text-gray-500 hover:text-red-500 mr-2 text-lg font-bold px-2"
                aria-label="Clear selected file"
                title="Clear selected file"
              >
                ×
              </button>
            )}

            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!fileSelected()}
            >
              Upload
            </button>
          </div>
          <div class="text-gray-400">Select a PDF that contains student's information. Then click Upload.</div>
        </div>
      </form>

    </main>


  )
}