<script lang="ts">
  import { flip } from "svelte/animate";
  import { liveQuery } from "dexie";
  import Bookmark from "./StackBookmark.svelte";
  import IDB from "../../IDB";

  let tiles = liveQuery(() => IDB.tiles.where("parentId").equals(-2).toArray());
</script>

<div class="w-1/4 rounded-3xl bg-neutral-200 dark:bg-neutral-900 p-4 shrink-0">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="w-full h-full rounded-2xl space-y-2 overflow-y-auto"
    on:dragover={(ev) => {
      if (
        ev.dataTransfer.types.includes("text/uri-list") ||
        ev.dataTransfer.types.includes("pagepouch/id")
      ) {
        ev.preventDefault();
      }
    }}
    on:dragenter={(ev) => {
      if (
        ev.dataTransfer.types.includes("text/uri-list") ||
        ev.dataTransfer.types.includes("pagepouch/id")
      ) {
        ev.preventDefault();
      }
    }}
    on:drop|preventDefault={(ev) => {
      if (ev.dataTransfer.types.includes("pagepouch/id")) {
        if (ev.dataTransfer.getData("pagepouch/type") === "directory") return;
        const droppedId = parseInt(ev.dataTransfer.getData("pagepouch/id"));
        IDB.tiles.update(droppedId, { parentId: -2 });
      } else {
        let url = ev.dataTransfer.getData("text/uri-list");
        IDB.tiles.add({
          type: "bookmark",
          title: url,
          added: new Date().getTime(),
          url,
          parentId: -2,
        });
      }
    }}
  >
    {#if $tiles}
      {#each $tiles as tile (tile.id)}
        <div animate:flip={{ duration: 300 }} class="h-16">
          {#if tile.type === "bookmark"}
            <Bookmark
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
