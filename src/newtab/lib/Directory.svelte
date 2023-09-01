<script lang="ts">
  import IDB from "../../IDB";
  import { IconEdit, IconFolder } from "@tabler/icons-svelte";
  import recursiveDelete from "../utils/recursiveDelete";

  export let title: string;
  export let id: number | undefined = undefined;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:keydown={(ev) => {
    if (ev.key === "Delete") {
      ev.preventDefault();
      recursiveDelete(id);
    }
  }}
  class="h-full w-full group bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex"
>
  <button
    on:click={() => {
      location.hash = "#" + id;
    }}
    class="flex grow items-center rounded-l-2xl active-outline"
  >
    <div class="w-16 grid place-items-center shrink-0">
      <IconFolder class="w-[60%] text-neutral-700 dark:text-neutral-300" />
    </div>
    <div class="grow flex flex-col gap-1">
      <div class="w-full flex">
        <h1
          class="w-0 grow font-sans-bold text-neutral-800 dark:text-neutral-200 text-lg line-clamp-1 text-left"
        >
          {title}
        </h1>
      </div>
    </div>
  </button>
  <div
    class="w-16 grid place-items-center shrink-0 transition-opacity opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
  >
    <button
      on:click={() => {}}
      class="w-3/4 aspect-square rounded-xl grid place-items-center transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 active-outline"
    >
      <IconEdit />
    </button>
  </div>
</div>
