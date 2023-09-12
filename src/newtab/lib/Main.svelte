<script lang="ts">
  import { flip } from "svelte/animate";
  import { liveQuery } from "dexie";
  import drop from "../utils/drop";
  import Bookmark from "./Bookmark.svelte";
  import Directory from "./Directory.svelte";
  import IDB from "../../IDB";
  import activeDir from "../utils/activeDirectoryId";
  import Breadcrumbs from "./Breadcrumbs.svelte";
  import { writable } from "svelte/store";

  $: tiles = liveQuery(() =>
    IDB.tiles.where("parentId").equals($activeDir).toArray()
  );

  let dropReady = false;
</script>

<div
  class="grow bg-neutral-200 dark:bg-neutral-900 rounded-3xl mx-8 xl:mx-24 p-4 flex flex-col"
>
  <Breadcrumbs />
  <div
    class="grow rounded-2xl overflow-y-auto flex items-start h-0 {dropReady
      ? 'outline outline-2 outline-offset-2 outline-accent'
      : ''}"
  >
    <main
      class="w-full min-h-full gap-2 grid grid-cols-3 grid-flow-dense auto-rows-[4.5rem]"
      use:drop={{
        id: $activeDir,
        preventDrop: (ev) =>
          ev.dataTransfer.types.includes(
            "pagepouch/parentid/" + $activeDir.toString()
          ),
      }}
      on:dropready={() => (dropReady = true)}
      on:dropreadyend={() => (dropReady = false)}
    >
      {#if $tiles}
        {#each $tiles as tile (tile.id)}
          {@const colspan = tile.span?.col ?? 1}
          {@const rowspan =
            tile.span?.row ??
            (tile.type === "bookmark" && tile.description ? 2 : 1)}
          <div
            style:grid-column="span {colspan} / span {colspan}"
            style:grid-row="span {rowspan} / span {rowspan}"
            animate:flip={{ duration: 300 }}
          >
            {#if tile.type === "bookmark"}
              <Bookmark
                parentId={$activeDir}
                title={tile.title}
                url={tile.url}
                description={tile.description}
                icon={tile.icon}
                id={tile.id}
              />
            {:else if tile.type === "directory"}
              <Directory
                parentId={$activeDir}
                title={tile.title}
                id={tile.id}
              />
            {/if}
          </div>
        {/each}
      {/if}
    </main>
  </div>
</div>
