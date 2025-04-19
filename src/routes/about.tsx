import { A } from "@solidjs/router";
import Counter from "~/components/Counter";

export default function About() {
  return (
    <main class="text-center mx-auto text-gray-700 px-10 lg:px-32">
      <h1 class="text-4xl text-sky-700 font-thin uppercase my-16">About</h1>
      <p>
        Student 360 is an innovative platform that revolutionizes the way students are monitored and guided throughout their academic journey. Built with cutting-edge Blockchain and Artificial Intelligence technologies, Student 360 provides a holistic view of each student’s growth, behavior, and academic tendencies — especially in boarding school environments.
      </p>
      <p class="mt-9">
        This is the <A href="/" class="text-blue-600 hover:underline">playground</A> version.
      </p>
    </main>

  );
}
