import { readable } from "svelte/store";

export function parseHash(hash: string): number {
  return hash.startsWith("#") ? parseInt(hash.slice(1)) : -1;
}

export default readable(parseHash(location.hash), (set) => {
  addEventListener("hashchange", () => {
    set(parseHash(location.hash));
  });
});
