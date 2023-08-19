<script lang="ts">
    import {flip} from "svelte/animate"
    import { liveQuery } from "dexie";
    import Joey from "./Joey.svelte";
    import IDB from "../../IDB"
    let joeys = liveQuery(() => IDB.joeys.orderBy("added").toArray());

</script>

<div class="bg-slate-200 overflow-y-auto dark:bg-slate-800 h-full w-full md:w-1/2 xl:w-1/3 border border-slate-300 dark:border-slate-700 rounded-md flex flex-col gap-2 p-4 shadow-md">
    {#if $joeys}
    {#each $joeys as joey (joey.id)}
    <div animate:flip={{duration:300}}>
        <Joey  {...joey} />
    </div>
    {/each}
  {/if}
</div>