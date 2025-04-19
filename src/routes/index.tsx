import { getUser, logout } from "~/auth.js"
import { A, useNavigate } from "@solidjs/router"
import { Show, createSignal, onMount } from "solid-js"
import { remult } from "remult"

export default function Home() {
  const [authenticated, setAuthenticated] = createSignal(false)
  const navigate = useNavigate()

  onMount(async () => {
    remult.user = await getUser()
    if (remult.authenticated()) setAuthenticated(true)
    else navigate("/login")
  })
  return (
    <Show when={authenticated()}>
      <main class="min-h-screen flex justify-center bg-gray-50 text-gray-700">
        <div class="mt-7">
          <h1 class="text-4xl text-sky-700 font-thin">Home</h1>
          <ul class="list-inside">
            <li>
              <A href="/student" class="text-blue-600 hover:underline">I want to upload Student Data ...</A>
            </li>
          </ul>
        </div>
      </main>
    </Show>
  );
}
