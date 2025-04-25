// src/hooks/clickOutside.ts
import { onCleanup } from "solid-js";

export function clickOutside(el: HTMLElement, accessor: () => () => void) {
  const onClick = (e: MouseEvent) => {
    if (!el.contains(e.target as Node)) {
      accessor()?.();
    }
  };

  document.addEventListener("click", onClick);
  onCleanup(() => document.removeEventListener("click", onClick));
}
