import { A } from "@solidjs/router";
import Counter from "~/components/Counter";

export default function About() {
  return (
    <main class="container mx-auto px-3">
      <p class="text-gray-600">
        Student 360 is an innovative platform that revolutionizes the way students are monitored and guided throughout their academic journey. Built with cutting-edge Blockchain and Artificial Intelligence technologies, Student 360 provides a holistic view of each student’s growth, behavior, and academic tendencies — especially in boarding school environments.
      </p>
      <p class="mt-9 text-gray-600">
        This is the <A href="/" class="text-blue-600 hover:underline">playground</A> version.
      </p>
    </main>

  );
}
