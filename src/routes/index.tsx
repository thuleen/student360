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
      <main class="container mx-auto px-3">
        <ul class="list-inside">
          <li>
            <A href="/student" class="text-blue-600 hover:underline">I want to upload student info ...</A>
          </li>
        </ul>
      </main>
    </Show>
  );
}
