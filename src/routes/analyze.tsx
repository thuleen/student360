import { onMount, createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { remult } from "remult";
import { getUser } from "~/auth.js"
import ChatBot from "~/components/ChatBot";

export default function Analyze() {
  const [authenticated, setAuthenticated] = createSignal(false)
  const navigate = useNavigate()

  onMount(async () => {
    remult.user = await getUser()
    if (remult.authenticated()) setAuthenticated(true)
    else navigate("/login")
  })

  return (
    <ChatBot />

  );
}
