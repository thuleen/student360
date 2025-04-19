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
      <main class="text-center mx-auto text-gray-700 px-10 lg:px-32">

        <h1 class="text-4xl text-sky-700 font-thin uppercase my-16">Home</h1>
        <div class="mt-7">
          <ul class="list-inside">
            <li>
              <A href="/student" class="text-blue-600 hover:underline">I want to upload student info ...</A>
            </li>
          </ul>
        </div>
      </main>
    </Show>
  );
}
