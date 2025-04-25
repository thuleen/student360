import { createEffect } from "solid-js";
import { useSubmission, A, useNavigate } from "@solidjs/router"
import { loginAction } from "~/auth"
import { useUserService } from "~/contexts/useUserService";

export default function Home() {
  const sub = useSubmission(loginAction)

  const navigate = useNavigate();
  const { refetchUser } = useUserService(); // ✅ access refetch

  // ✅ When login result has a user (i.e., login success), refetch user and redirect
  createEffect(() => {
    if (sub.result && sub.result.user) {
      refetchUser();        // 💥 refresh context
      navigate("/");        // ✅ go to home/dashboard after login
    }
  });

  return (
    <main class="container mx-auto pt-21 max-w-md">
      <form action={loginAction} method="post">
        <div class="my-16 items-center">
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
      <hr class="border-t border-gray-200 mx-4 mb-9" />
      <A href="/" class="text-blue-600 hover:underline">Sign me up!</A>
    </main >
  );
}
