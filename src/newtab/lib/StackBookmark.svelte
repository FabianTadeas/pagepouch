<script lang="ts">
  import IDB from "../../IDB";
  import { IconTrash } from "@tabler/icons-svelte";

  export let title: string;
  export let url: string;
  export let icon: string | undefined = undefined;
  export let id: number | undefined = undefined;

  let deletionState = 0;
  $: if (deletionState === 2) {
    IDB.tiles.delete(id);
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:keydown={(ev) => {
    if (ev.key === "Delete") {
      ev.preventDefault();
      IDB.tiles.delete(id);
    }
  }}
  class="h-full w-full group bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex"
>
  <a href={url} class="flex grow items-center rounded-l-2xl active-outline">
    <div class="w-16 grid place-items-center shrink-0">
      {#if icon}
        <img
          on:error={function () {
            this.remove();
          }}
          class="max-w-[60%]"
          src={icon}
          alt={title}
        />
      {/if}
    </div>
    <h1
      class="grow w-0 font-sans-bold text-neutral-800 dark:text-neutral-200 text-lg line-clamp-1"
    >
      {title}
    </h1>
  </a>
  <div class="w-16 grid place-items-center shrink-0 transition-opacity opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
    <button
      on:focusout={() => {
        deletionState = 0;
      }}
      on:click|preventDefault={() => {
        deletionState++;
      }}
      class="w-3/4 aspect-square rounded-xl grid place-items-center transition-colors active-outline {deletionState ===
      0
        ? 'hover:bg-neutral-200 hover:dark:bg-neutral-700 text-red-500 dark:text-red-600'
        : 'bg-red-400 dark:bg-red-700 hover:bg-red-500 hover:dark:bg-red-600 text-neutral-100 dark:text-neutral-800'}"
    >
      <IconTrash />
    </button>
  </div>
</div>
