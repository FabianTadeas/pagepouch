<script lang="ts">
  import IDB from "../../IDB";
  import {
    IconEdit,
    IconAlignJustified,
    IconBallpen,
    IconTrash,
    IconArrowsMove,
    IconIcons,
  } from "@tabler/icons-svelte";
  import { fade } from "svelte/transition";

  export let title: string;
  export let url: string;
  export let description: string | undefined = undefined;
  export let icon: string | undefined = undefined;
  export let id: number | undefined = undefined;

  let editMode = false;
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
    if (ev.key === "Escape" && editMode) {
      ev.preventDefault();
      editMode = false;
    }
  }}
  on:focusout={(ev) => {
    if (!ev.currentTarget.contains(ev.relatedTarget)) {
      editMode = false;
    }
  }}
  class="h-full w-full group bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex"
>
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
            title={chrome.i18n.getMessage("tabBookmarkEditDescription")}
            on:click={() => {
              const description = prompt("description");
              IDB.tiles.update(id, { description });
            }}
            class="w-3/4 aspect-square rounded-xl grid place-items-center transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 active-outline"
          >
            <IconAlignJustified />
          </button>
        </div>
        <div class="w-16 grid place-items-center shrink-0">
          <button
            title={chrome.i18n.getMessage("tabBookmarkEditMove")}
            on:click={() => {}}
            class="w-3/4 aspect-square rounded-xl grid place-items-center transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 active-outline"
          >
            <IconArrowsMove />
          </button>
        </div>
        <div class="w-16 grid place-items-center shrink-0">
          <button
            title={chrome.i18n.getMessage("tabBookmarkEditDelete")}
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
    <a
      tabindex={editMode ? -1 : 0}
      href={url}
      class="w-full h-full flex items-center rounded-l-2xl active-outline"
    >
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
      <div class="grow flex flex-col gap-1">
        <div class="w-full flex">
          <h1
            class="w-0 grow font-sans-bold text-neutral-800 dark:text-neutral-200 text-lg line-clamp-1"
          >
            {title}
          </h1>
        </div>
        {#if description}
          <div class="w-full flex">
            <p
              class="w-0 grow font-sans text-neutral-700 dark:text-neutral-300 text-sm line-clamp-2"
            >
              {description}
            </p>
          </div>
        {/if}
      </div>
    </a>
  </div>

  <div
    class="w-16 grid place-items-center shrink-0 transition-opacity opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 {editMode
      ? 'opacity-100'
      : ''}"
  >
    <button
      title={chrome.i18n.getMessage("tabBookmarkEdit")}
      on:click={() => {
        editMode = !editMode;
      }}
      class="w-3/4 aspect-square rounded-xl grid place-items-center transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 active-outline {editMode
        ? 'bg-neutral-200 dark:bg-neutral-700'
        : ''}"
    >
      <IconEdit />
    </button>
  </div>
</div>
