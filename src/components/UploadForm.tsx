import { JSX } from "solid-js";

interface UploadFormProps {
  fileName: () => string | undefined;
  fileSelected: () => boolean;
  handleFileChange: (e: Event) => void;
  handleClearFile: () => void;
}

export default function UploadForm(props: UploadFormProps): JSX.Element {
  return (
    <div class="container mx-auto px-3">
      <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-700">
        <div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 px-7">
          PDF
        </div>

        <input
          type="file"
          name="pdf"
          accept="application/pdf"
          id="file-input"
          class="hidden"
          onChange={props.handleFileChange}
        />

        <label
          for="file-input"
          class="cursor-pointer py-2 px-4 bg-gray-700 text-white hover:bg-gray-400 rounded-l-md"
        >
          Select
        </label>

        {props.fileName() && (
          <div class="mx-1 text-gray-700 text-sm">{props.fileName()}</div>
        )}

        {!props.fileName() && (
          <div class="mx-1 text-gray-500 text-sm">file contains student info. Then click Upload.</div>
        )}

        <div class="flex-grow"></div>
        {props.fileName() && (
          <button
            type="button"
            onClick={props.handleClearFile}
            class="text-gray-500 hover:text-gray-400 mx-3 text-xs"
          >
            ✕
          </button>)}

        <button
          type="submit"
          class="cursor-pointer bg-gray-700 text-white px-4 py-2 hover:bg-gray-400 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!props.fileSelected()}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
