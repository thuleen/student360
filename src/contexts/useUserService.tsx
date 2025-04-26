import { createResource, createContext, useContext, createEffect, createSignal, Accessor, JSX, onCleanup } from "solid-js";
import { type UserInfo } from "remult"
import { getUser, logout as logoutServer, loginAction as loginServer } from "~/auth";

interface ProviderProps {
  children: JSX.Element; // JSX.Element for Solid.js
}

export function createUserServiceHook() {

  interface ContextValueProps {
    loading: boolean;
    user: Accessor<UserInfo | undefined>;
    logout: () => Promise<void>;
    login: () => Promise<void>;
    refetchUser: () => void;
    refetchUser: () => void;
  }

  const Context = createContext<ContextValueProps>();

  function Provider(props: ProviderProps) {

    // const [userRes] = createResource(getUser);
    const [userRes, { refetch }] = createResource(getUser);

    createEffect(() => {
      console.log("userRes loading:", userRes.loading);
      console.log("userRes data:", userRes());
    });

    const handleLogout = async () => {
      await logoutServer(); // call server function
      await refetch();      // update client state
      refetch();
      console.log("logout!");
    }

    const handleLogin = async () => {
      await loginAction();
    }


    const value: ContextValueProps = {
      user: () => userRes() || undefined,
      loading: userRes.loading,
      logout: () => handleLogout(),
      login: () => handleLogin(),
      refetchUser: () => refetch()
    };

    return <Context.Provider value={value}> {props.children} </Context.Provider>;
  }

  function useUserServiceContext() {
    const ctx = useContext(Context);
    if (!ctx) {
      throw new Error("useUserServiceContext must be used within a UserServiceProvider");
    }
    return ctx;
  }

  return {
    Provider,
    useUserServiceContext,
  };
}

const { Provider, useUserServiceContext } = createUserServiceHook();
export { Provider as UserServiceProvider, useUserServiceContext as useUserService };
