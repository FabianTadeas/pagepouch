<script lang="ts">
  import { IconHome, IconChevronRight } from "@tabler/icons-svelte";
  import activeDir from "../utils/activeDirectoryId";
  import IDB from "../../IDB";
  import dropArea from "../utils/dropArea";

  function buildPath(
    activeId: number
  ): Promise<Array<{ title: string; id: number }>> {
    return new Promise((resolve) => {
      let pathAccumulator = [];
      function addToPath(id: number) {
        IDB.tiles.get(id).then((result) => {
          if (result) {
            pathAccumulator.unshift({ title: result.title, id: result.id });
            addToPath(result.parentId);
          } else {
            resolve(pathAccumulator);
          }
        });
      }
      addToPath(activeId);
    });
  }

  $: path = buildPath($activeDir);
</script>

<h1 class="text-neutral-500 font-sans-bold text-sm mb-4 px-4 flex shrink-0">
  <button
    on:click={() => {
      location.hash = "-1";
    }}
    use:dropArea={{ id: -1, openOnHover: true }}
    class="last:text-neutral-800 last:dark:text-neutral-300 active-outline px-1 rounded-md"
  >
    <IconHome class="h-5 w-5" />
  </button>
  {#await path then pathAwaited}
    {#each pathAwaited as pathElement}
      <IconChevronRight
        class="w-4 h-5 text-neutral-400 dark:text-neutral-700"
      />
      <button
        on:click={() => {
          location.hash = "#" + pathElement.id;
        }}
        use:dropArea={{ id: pathElement.id, openOnHover: true }}
        class="last:text-neutral-800 last:dark:text-neutral-300 active-outline px-2 rounded-md group"
      >
        <span class="group-hover:underline">{pathElement.title}</span>
      </button>
    {/each}
  {/await}
</h1>
