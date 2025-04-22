import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createSignal, Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import { XServiceProvider } from "./contexts/useXService";

export default function App() {
  const [showDrawer, setShowDrawer] = createSignal(false);

  return (
    <XServiceProvider>
      <Router
        root={props => (
          <MetaProvider>
            <Title>Student360</Title>
            <Nav showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
            {/* Main content that moves with the drawer */}
            <div
              class={`transition-transform duration-300 ${showDrawer() ? "translate-x-64" : ""
                }`}
            >
              <Suspense>{props.children}</Suspense>
            </div>
          </MetaProvider>
        )}
      >
        <FileRoutes />
      </Router>
    </XServiceProvider>
  );
}
