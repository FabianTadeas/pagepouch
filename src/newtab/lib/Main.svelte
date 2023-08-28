<script lang="ts">
  import { flip } from "svelte/animate";
  import { liveQuery } from "dexie";
  import { IconHome } from "@tabler/icons-svelte";
  import Tile from "./Tile.svelte";
  import IDB from "../../IDB";

  function hashToNumber(hash: string): number {
    return hash.startsWith("#") ? parseInt(hash.slice(1)) : -1;
  }

  let tiles = liveQuery(() =>
    IDB.joeys.where("parentId").equals(hashToNumber(location.hash)).toArray()
  );
  addEventListener("hashchange", () => {
    tiles = liveQuery(() =>
      IDB.joeys.where("parentId").equals(hashToNumber(location.hash)).toArray()
    );
  });
</script>

<div
  class="grow bg-neutral-200 dark:bg-neutral-900 rounded-3xl mx-8 xl:mx-24 p-4 flex flex-col"
>
  <h1
    class="text-neutral-600 dark:text-neutral-400 font-sans-bold text-sm mb-4 px-4 flex shrink-0"
  >
    <IconHome class="h-5 hover:underline" />
    <span class="text-neutral-400 dark:text-neutral-600 px-1">></span>
    <span class="px-1 hover:underline">Fun</span>
    <span class="text-neutral-400 dark:text-neutral-600 px-1">></span>
    <span class="px-1 hover:underline">Movies</span>
  </h1>
  <div class="grow rounded-2xl overflow-y-auto flex items-start h-0">
    <main
      class="w-full gap-2 grid grid-cols-3 grid-flow-dense auto-rows-[4rem]"
    >
      {#if $tiles}
        {#each $tiles as tile (tile.id)}
          {@const a = tile.title.length > 30}
          <div
            animate:flip={{ duration: 300 }}
            class="{a ? 'row-span-2' : ''}"
          >
            <Tile description={a?tile.title:undefined} {...tile} />
          </div>
        {/each}
      {/if}
    </main>
  </div>
  <!-- <main class="overflow-y-auto grow flex rounded-2xl">
    <div class="grid grid-cols-3 auto-rows-[4rem] gap-2 w-full h-0 grow">
    </div>
  </main> -->
</div>
