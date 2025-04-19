import { Show, createSignal, onMount } from "solid-js"
import { remult } from "remult"
import { A, useLocation } from "@solidjs/router";
import { useNavigate } from "@solidjs/router";
import { useXService } from "~/contexts/useXService";

import { getUser, logout } from "~/auth.js"

export default function Nav() {

  const [authenticated, setAuthenticated] = createSignal(false)
  const { bebe } = useXService();
  const navigate = useNavigate();

  onMount(async () => {
    remult.user = await getUser()
    if (remult.authenticated()) setAuthenticated(true)
    else setAuthenticated(false)
  })



  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";
  return (
    <nav class="bg-white">
      <div class="container mx-auto flex justify-between items-center p-3 text-gray-700">
        <div class="font-semibold text-lg">
          <A href="/">Student360</A>
        </div>
        <div class="flex items-center space-x-4">
          <A href="/about" class="text-sm text-gray-400 hover:text-blue-500">About</A>
          <button
            class="text-sm text-gray-400 hover:text-red-500"
            onClick={async () => logout().then(() => navigate("/login"))}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>

  );
}
