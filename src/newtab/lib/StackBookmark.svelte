<script lang="ts">
  import IDB from "../../IDB";
  import { IconTrash, IconArrowsMove } from "@tabler/icons-svelte";
  import drag, { move } from "../utils/drag";
  import { writable } from "svelte/store";

  export let title: string;
  export let url: string;
  export let icon: string | undefined = undefined;
  export let id: number | undefined = undefined;
  export let parentId: number;

  let deletionState = 0;
  $: if (deletionState === 2) {
    IDB.tiles.delete(id);
  }
  let isDragged = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:keydown={(ev) => {
    if (ev.key === "Delete") {
      ev.preventDefault();
      IDB.tiles.delete(id);
    }
  }}
  use:drag={{ data: { id, parentId, type: "stackbookmark", url } }}
  on:dragstart={() => (isDragged = true)}
  on:dragend={() => (isDragged = false)}
  class="h-full w-full group rounded-2xl {isDragged
    ? 'outline outline-2 -outline-offset-2 text-neutral-400 dark:text-neutral-600 outline-current grid place-items-center'
    : 'bg-neutral-100 dark:bg-neutral-800 flex'}"
>
  {#if isDragged}
    <IconArrowsMove />
  {:else}
    <a
      draggable="false"
      href={url}
      class="flex grow items-center rounded-l-2xl active-outline"
    >
      <div class="w-16 grid place-items-center shrink-0">
        {#if icon}
          <img
            draggable="false"
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
    <div
      class="w-16 grid place-items-center shrink-0 transition-opacity opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
    >
      <button
        title={chrome.i18n.getMessage("tabBookmarkEditMove")}
        use:move
        class="w-3/4 aspect-square rounded-xl grid place-items-center transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 active-outline"
      >
        <IconArrowsMove />
      </button>
    </div>
    <div
      class="w-16 grid place-items-center shrink-0 transition-opacity opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
    >
      <button
        title={deletionState === 1
          ? chrome.i18n.getMessage("tabBookmarkEditDeleteConfirm")
          : chrome.i18n.getMessage("tabBookmarkEditDelete")}
        on:blur={() => {
          deletionState = 0;
        }}
        on:click={() => {
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
  {/if}
</div>
