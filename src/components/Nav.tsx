import { Show, createSignal, onMount, createEffect } from "solid-js"
import { remult } from "remult"
import { Settings, Info, LogOut, User } from "lucide-solid";
import { A, useLocation } from "@solidjs/router";
import { useNavigate } from "@solidjs/router";
import { useUserService } from "~/contexts/useUserService";
import sidebarIcon from "./sidebar.png"

import { getUser } from "~/auth.js"
import { clickOutside } from "./clickOutside";
import { APP_NAME } from "~/app";

export default function Nav(props: {
  showDrawer: () => boolean;
  setShowDrawer: (v: boolean) => void;
}) {


  const { user, logout, refetchUser } = useUserService();
  const [showMenu, setShowMenu] = createSignal(false);
  const [authenticated, setAuthenticated] = createSignal(false)
  const navigate = useNavigate();

  onMount(async () => {
    remult.user = await getUser()
    if (remult.authenticated()) {
      setAuthenticated(true)
    }
    else setAuthenticated(false)

    refetchUser();
  })

  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  }

  return (
    <>
      {/* Sidebar Drawer */}
      <div
        class={`fixed pt-15 left-0 h-full w-64 bg-gray-100 z-40 transition-transform duration-300 ${props.showDrawer() ? "translate-x-0" : "-translate-x-full"
          }`}
      >

        <ul class="p-4 space-y-2">
          <li><A href="/" onClick={() => props.setShowDrawer(false)}>Dashboard</A></li>
          <li><A href="/analyze" onClick={() => props.setShowDrawer(false)}>Analyze</A></li>
          <li><A href="/students" onClick={() => props.setShowDrawer(false)}>Students</A></li>
          <li><A href="/about" onClick={() => props.setShowDrawer(false)}>About</A></li>
        </ul>
        <hr class="border-t border-gray-200 mx-4" />
      </div>

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
              <A href="/">{APP_NAME}</A>
            </div>
          </div>

          {/* Avatar & Dropdown */}
          {<Show when={user()}>
            <div class="relative" use:clickOutside={() => setShowMenu(false)}>
              <button
                onClick={() => setShowMenu(!showMenu())}
                class="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold hover:bg-gray-400"
              >
                {user()?.name?.charAt(0).toUpperCase() ?? "..."}
              </button>

              {showMenu() && (
                <div class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-50">
                  <A
                    href="/user"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowMenu(false)}
                  >
                    <span class="flex items-center space-x-2">
                      <User class="w-4 h-4" />
                      <span>{`${user()?.name}` ?? "..."}</span>
                    </span>
                  </A>
                  <A
                    href="/settings"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowMenu(false)}
                  >
                    <span class="flex items-center space-x-2">
                      <Settings class="w-4 h-4" />
                      <span>Settings</span>
                    </span>
                  </A>

                  <A
                    href="/about"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowMenu(false)}
                  >
                    <span class="flex items-center space-x-2">
                      {/* Use an empty span to reserve icon space */}
                      <span class="w-4 h-4" />
                      <span>About</span>
                    </span>
                  </A>

                  <hr class="border-t border-gray-200 mx-4" />

                  <button
                    class="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <span class="flex items-center space-x-2">
                      <LogOut class="w-4 h-4" />
                      <span>Logout</span>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </Show>
          }
        </div>
      </nav>
    </>
  );
}
