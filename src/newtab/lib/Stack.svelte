<script lang="ts">
  import { flip } from "svelte/animate";
  import { liveQuery } from "dexie";
  import drop from "../utils/drop";
  import Bookmark from "./StackBookmark.svelte";
  import IDB from "../../IDB";
  import { writable } from "svelte/store";

  let tiles = liveQuery(() => IDB.tiles.where("parentId").equals(-2).toArray());

  let dropReady = false;
</script>

<div class="w-1/4 rounded-3xl bg-neutral-200 dark:bg-neutral-900 p-4 shrink-0">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="w-full h-full rounded-2xl space-y-2 overflow-y-auto {dropReady
      ? 'outline outline-2 outline-offset-2 outline-accent'
      : ''}"
    use:drop={{
      id: -2,
      preventDrop: (ev) =>
        ev.dataTransfer.types.includes("pagepouch/type/directory") ||
        ev.dataTransfer.types.includes("pagepouch/parentid/-2"),
    }}
    on:dropready={() => (dropReady = true)}
    on:dropreadyend={() => (dropReady = false)}
  >
    {#if $tiles}
      {#each $tiles as tile (tile.id)}
        <div animate:flip={{ duration: 300 }} class="h-16">
          {#if tile.type === "bookmark"}
            <Bookmark
              parentId={-2}
              title={tile.title}
              url={tile.url}
              icon={tile.icon}
              id={tile.id}
            />
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>
