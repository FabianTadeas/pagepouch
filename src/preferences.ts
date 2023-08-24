import IDB from "./IDB";
import { liveQuery } from "dexie";
import { readable } from "svelte/store";

function makeOption<T>(key: string, initial: T) {
  const { subscribe } = readable<T>(initial, (set) => {
    return liveQuery(() => IDB.preferences.get(key)).subscribe((v) =>
      set(v ?? initial)
    ).unsubscribe;
  });

  const get = () => IDB.preferences.get(key) as Promise<T>;
  const set = (value: T) => {
    IDB.preferences.put(value, key);
  };
  const update = (updater: (value: T) => T) => {
    get().then((v) => set(updater(v)));
  };

  return {
    subscribe,
    get,
    set,
    update,
  };
}

export const theme = makeOption<{neutral: "dark" | "light" | "auto", accent: string}>("theme", {accent:"139 92 246",neutral:"auto"});
