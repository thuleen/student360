import { useSubmission } from "@solidjs/router"
import { loginAction } from "~/auth"

export default function Home() {
  const sub = useSubmission(loginAction)
  return (
    <main class="min-h-screen flex justify-center bg-gray-50 text-gray-700">
      <form action={loginAction} method="post">
        <div class="my-16">
          <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
            <div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Username</div>
            <input
              type="text"
              name="username"
              id="username"
              class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              placeholder="Firasat or Rizal"
            />
            <button class="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 rounded-r-md">
              Sign in
            </button>
          </div>
          <Show when={sub.result?.message}>
            <div class="mt-1 text-red-500">
              {sub.result?.message}
            </div>
          </Show>
        </div>
      </form>
    </main >
  );
}
