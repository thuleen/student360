import { Show, createSignal, onMount } from "solid-js"
import { remult } from "remult"
import { A, useLocation } from "@solidjs/router";
import { useNavigate } from "@solidjs/router";
import { useXService } from "~/contexts/useXService";
import sidebarIcon from "./sidebar.png"

import { getUser, logout } from "~/auth.js"

export default function Nav(props: {
  showDrawer: () => boolean;
  setShowDrawer: (v: boolean) => void;
}) {

  const [showDrawer, setShowDrawer] = createSignal(false);
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
    <>
      {/* Sidebar Drawer */}
      <div
        class={`fixed top-0 left-0 h-full w-64 bg-gray-100 z-40 transition-transform duration-300 ${props.showDrawer() ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div class="p-4">
          <h2 class="text-lg font-semibold">Menu</h2>
        </div>
        <ul class="p-4 space-y-2">
          <li><A href="/" onClick={() => props.setShowDrawer(false)}>Dashboard</A></li>
          <li><A href="/about" onClick={() => props.setShowDrawer(false)}>About</A></li>
        </ul>
      </div>

      {/* Top Navbar */}
      <nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <div class="container mx-auto flex justify-between items-center p-3 text-gray-700">
          <div class="flex items-center space-x-3">
            <button
              class="text-gray-500 hover:text-blue-500 focus:outline-none"
              onClick={() => props.setShowDrawer(!props.showDrawer())}
              aria-label="Open sidebar"
            >
              <img src={sidebarIcon} alt="Menu" class="w-6 h-6 object-contain rounded-md hover:bg-gray-200 cursor-pointer focus:outline-none" />
            </button>
            <div class="font-semibold text-lg">
              <A href="/">Student360</A>
            </div>
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
    </>
  );
}
