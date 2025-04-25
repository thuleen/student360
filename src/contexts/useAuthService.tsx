import { createContext, useContext, createEffect, createSignal, Accessor, JSX, onCleanup } from "solid-js";

interface ProviderProps {
  children: JSX.Element; // JSX.Element for Solid.js
}

export function createAuthServiceHook() {

  interface ContextValueProps {
    bebe: Accessor<string>;
  }

  const Context = createContext<ContextValueProps>();

  function Provider(props: ProviderProps) {

    const [bebe, setBebe] = createSignal<string>("bebe123");

    const value: ContextValueProps = {
      bebe,
    };

    return <Context.Provider value={value}> {props.children} </Context.Provider>;
  }

  function useAuthServiceContext() {
    const ctx = useContext(Context);
    if (!ctx) {
      throw new Error("useAuthServiceContext must be used within a AuthServiceProvider");
    }
    return ctx;
  }

  return {
    Provider,
    useAuthServiceContext,
  };
}

const { Provider, useAuthServiceContext } = createAuthServiceHook();
export { Provider as AuthServiceProvider, useAuthServiceContext as useAuthService };
