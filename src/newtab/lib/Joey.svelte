<script lang="ts">
    import IDB from "../../IDB"
    import { IconTrash } from "@tabler/icons-svelte"

    export let title: string;
    export let url: string;
    export let icon: string|undefined=undefined;
    export let added: number;
    export let id: number|undefined=undefined
</script>

<a on:keydown={(ev)=>{
    if (ev.key === "Delete") {
        ev.preventDefault()
        IDB.joeys.delete(id)
    }
}} class="w-full h-16 bg-slate-300 dark:bg-slate-700 rounded-md shrink-0 shadow-md flex px-4 gap-2 hover:shadow-xl hover:outline outline-1 transition-all outline-slate-400 dark:outline-slate-600" href={url}>
    <div class="aspect-square h-full grid place-items-center">
        <img class="max-h-[75%]" src={icon} alt={title} />
    </div>
    <div class="grid place-items-center overflow-hidden w-full">
        <p
          class="line-clamp-1 font-sans-bold text-xl text-neutral-800 dark:text-neutral-200"
        >
          {title}
        </p>
    </div>
    <div class="aspect-square h-full grid place-items-center">
        <button class="grid place-items-center aspect-square h-3/4 hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors rounded-md" on:click|preventDefault={()=>{
IDB.joeys.delete(id)
        }}>
            <IconTrash class="text-red-600 dark:text-red-400"/>
        </button>
    </div>
</a>