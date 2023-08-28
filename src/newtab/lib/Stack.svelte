<script lang="ts">
  import { flip } from "svelte/animate";
  import { liveQuery } from "dexie";
  import Tile from "./StackTile.svelte";
  import IDB from "../../IDB";
  let tiles = liveQuery(() => IDB.joeys.where("parentId").equals(-2).toArray());
</script>

<div class="w-1/4 rounded-3xl bg-neutral-200 dark:bg-neutral-900 p-4 shrink-0">
  <div class="w-full h-full rounded-2xl space-y-2 overflow-y-auto">
    {#if $tiles}
      {#each $tiles as tile (tile.id)}
        <div animate:flip={{ duration: 300 }} class="h-16">
          <Tile {...tile} />
        </div>
      {/each}
    {/if}
  </div>
</div>
