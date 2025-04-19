import { A } from '@solidjs/router';

export default function Student() {
  return (
    <main class="min-h-screen flex justify-center bg-gray-50 text-gray-700">
      <div class="mt-7">
        <h1 class="text-4xl text-sky-700 font-thin">Student page</h1>
        <ul class="list-inside">
          <li><A href="/student/upload" class="text-blue-600 hover:underline">Upload info pdf file ...</A></li>
          <li><A href="/" class="text-blue-600 hover:underline">Back home</A></li>
        </ul>
      </div>
    </main>
  )
}