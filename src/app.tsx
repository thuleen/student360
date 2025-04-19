import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import { XServiceProvider } from "./contexts/useXService";

export default function App() {
  return (
    <XServiceProvider>
      <Router
        root={props => (
          <MetaProvider>
            <Title>Student360</Title>
            <Nav />
            <Suspense>{props.children}</Suspense>
          </MetaProvider>
        )}
      >
        <FileRoutes />
      </Router>
    </XServiceProvider>
  );
}
