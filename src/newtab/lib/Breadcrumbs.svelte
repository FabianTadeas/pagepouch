<script lang="ts">
  import { IconHome, IconChevronRight } from "@tabler/icons-svelte";
  import activeDir from "../utils/activeDirectoryId";
  import IDB from "../../IDB";
  import Button from "./BreadcrumbsButton.svelte";

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
  <Button id={-1}>
    <IconHome class="h-5 w-5" />
  </Button>
  {#await path then pathAwaited}
    {#each pathAwaited as pathElement}
      <IconChevronRight
        class="w-4 h-5 text-neutral-400 dark:text-neutral-700"
      />
      <Button id={pathElement.id}>
        <span class="group-hover:underline">{pathElement.title}</span>
      </Button>
    {/each}
  {/await}
</h1>
