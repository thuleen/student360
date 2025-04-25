import { A } from "@solidjs/router";
import Counter from "~/components/Counter";

export default function Settings() {
  return (
    <main class="container mx-auto px-3 pt-21">
      <h1>Settings:</h1>
      <ul>
        <li>Theme</li>
        <li>Internalizations</li>
      </ul>
    </main>

  );
}
