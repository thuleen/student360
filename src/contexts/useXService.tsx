import { createContext, useContext, createEffect, createSignal, Accessor, JSX, onCleanup } from "solid-js";

interface ProviderProps {
  children: JSX.Element; // JSX.Element for Solid.js
}

export function createXServiceHook() {

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

  function useXServiceContext() {
    const ctx = useContext(Context);
    if (!ctx) {
      throw new Error("useXServiceContext must be used within a XServiceProvider");
    }
    return ctx;
  }

  return {
    Provider,
    useXServiceContext,
  };
}

const { Provider, useXServiceContext } = createXServiceHook();
export { Provider as XServiceProvider, useXServiceContext as useXService };
