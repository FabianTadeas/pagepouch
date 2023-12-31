<script lang="ts">
  import IDB from "../../IDB";
  import recursiveDelete from "../utils/recursiveDelete";
  import drop from "../utils/drop";
  import {
    IconEdit,
    IconBallpen,
    IconTrash,
    IconArrowsMove,
    IconIcons,
    IconFolder,
  } from "@tabler/icons-svelte";
  import { fade } from "svelte/transition";
  import drag, { move } from "../utils/drag";
  import { writable } from "svelte/store";

  export let title: string;
  export let id: number | undefined = undefined;
  export let parentId: number;

  let editMode = false;
  let deletionState = 0;
  $: if (deletionState === 2) {
    recursiveDelete(id);
  }
  let isDragged = false;
  let dropReady = false;
  let timeout: NodeJS.Timeout;
  $: dropReady
    ? (timeout = setTimeout(() => (location.hash = "#" + id), 1000))
    : clearTimeout(timeout);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:keydown={(ev) => {
    if (ev.key === "Delete") {
      ev.preventDefault();
      recursiveDelete(id);
    }
    if (ev.key === "Escape" && editMode) {
      ev.preventDefault();
      editMode = false;
    }
  }}
  on:focusout={(ev) => {
    // @ts-ignore
    if (!ev.currentTarget.contains(ev.relatedTarget)) {
      editMode = false;
    }
  }}
  use:drop={{
    id,
    preventDrop: (ev) =>
      ev.dataTransfer.types.includes("pagepouch/id/" + id.toString()),
  }}
  on:dropready={() => (dropReady = true)}
  on:dropreadyend={() => (dropReady = false)}
  use:drag={{ data: { id, parentId, type: "directory" } }}
  on:dragstart={() => (isDragged = true)}
  on:dragend={() => (isDragged = false)}
  class="h-full w-full group rounded-2xl {isDragged
    ? 'outline outline-2 -outline-offset-2 text-neutral-400 dark:text-neutral-600 outline-current grid place-items-center'
    : 'bg-neutral-100 dark:bg-neutral-800 flex'} {dropReady
    ? 'outline outline-2 -outline-offset-2 outline-accent'
    : ''}"
>
  {#if isDragged}
    <IconArrowsMove />
  {:else}
    <div class="grow relative">
      {#if editMode}
        <div
          transition:fade={{ duration: 100 }}
          class="absolute inset-0 flex grow overflow-x-auto bg-neutral-100 dark:bg-neutral-800 rounded-2xl"
        >
          <div class="w-16 grid place-items-center shrink-0">
            <button
              title={chrome.i18n.getMessage("tabBookmarkEditIcon")}
              on:click={() => {
                const icon = prompt("icon");
                IDB.tiles.update(id, { icon });
              }}
              class="w-3/4 aspect-square rounded-xl grid place-items-center transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 active-outline"
            >
              <IconIcons />
            </button>
          </div>
          <div class="w-16 grid place-items-center shrink-0">
            <button
              title={chrome.i18n.getMessage("tabBookmarkEditTitle")}
              on:click={() => {
                const title = prompt("title");
                IDB.tiles.update(id, { title });
              }}
              class="w-3/4 aspect-square rounded-xl grid place-items-center transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 active-outline"
            >
              <IconBallpen />
            </button>
          </div>
          <div class="w-16 grid place-items-center shrink-0">
            <button
              title={chrome.i18n.getMessage("tabBookmarkEditMove")}
              use:move
              class="w-3/4 aspect-square rounded-xl grid place-items-center transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 active-outline"
            >
              <IconArrowsMove />
            </button>
          </div>
          <div class="w-16 grid place-items-center shrink-0">
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
        </div>
      {/if}
      <button
        tabindex={editMode ? -1 : 0}
        on:click={() => {
          location.hash = "#" + id;
        }}
        class="w-full h-full flex items-center rounded-l-2xl active-outline"
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
    </div>
    <div
      class="w-16 grid place-items-center shrink-0 transition-opacity opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
    >
      <button
        title={chrome.i18n.getMessage("tabBookmarkEdit")}
        on:click={() => {
          editMode = !editMode;
        }}
        class="w-3/4 aspect-square rounded-xl grid place-items-center transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 active-outline"
      >
        <IconEdit />
      </button>
    </div>
  {/if}
</div>
