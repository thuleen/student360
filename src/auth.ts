// src/auth.ts

import { action, redirect } from "@solidjs/router"
import { useSession } from "vinxi/http"
import { type UserInfo } from "remult"

const validUsers: UserInfo[] = [
  { id: "1", name: "Firasat", roles: ["admin"] },
  { id: "2", name: "Rizal" },
  { id: "3", name: "Anna" },
  { id: "4", name: "Chod" },
]

export async function getSession() {
  "use server"
  return await useSession<{ user?: UserInfo }>({
    password:
      process.env["SESSION_SECRET"] ||
      "a_really_long_secret_password_that_you_should_seriously_replace",
  })
}

export const loginAction = action(async (formData: FormData) => {
  "use server";
  const username = String(formData.get("username"));

  try {
    const session = await getSession();
    const user = validUsers.find((x) => x.name === username);
    if (!user) {
      return { message: "Invalid user, try 'Chod', 'Firasat' or 'Rizal'" };
    }

    await session.update({ user });

    return { user }; // ✅ return the user to the client
  } catch (err) {
    return { message: (err as Error).message };
  }
}, "login");


export async function logout() {
  "use server"
  const session = await getSession()
  await session.update({ user: null! })
}

export async function getUser() {
  "use server"
  const session = await getSession()
  return session?.data?.user
}
