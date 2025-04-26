import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createSignal, Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import { UserServiceProvider } from "./contexts/useUserService";
import { getUser } from "~/auth";

export const APP_NAME = import.meta.env.VITE_APP_NAME;

export default function App() {
  const [showDrawer, setShowDrawer] = createSignal(false);

  const handleShowDrawer = () => {
    if (!getUser()) {
      return;
    }
    setShowDrawer(p => !showDrawer())
  }

  return (
    <UserServiceProvider>
      <Router
        root={props => (
          <MetaProvider>
            <Title>{APP_NAME}</Title>
            <Nav showDrawer={showDrawer} setShowDrawer={handleShowDrawer} />
            {/* Main content that moves with the drawer */}
            <div
              class={`transition-all duration-300 ${showDrawer() ? "ml-64" : "ml-0"
                }`}
            >
              <Suspense>{props.children}</Suspense>
            </div>
          </MetaProvider>
        )
        }
      >
        <FileRoutes />
      </Router >
    </UserServiceProvider >
  );
}
