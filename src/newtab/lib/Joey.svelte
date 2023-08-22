<script lang="ts">
    import IDB from "../../IDB"
    import { IconTrash } from "@tabler/icons-svelte"
    import { twMerge } from "tailwind-merge"

    export let title: string;
    export let url: string;
    export let icon: string|undefined=undefined;
    export let added: number;
    export let id: number|undefined=undefined

    let deletionState = 0
    $: if (deletionState === 2){
        IDB.joeys.delete(id)
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:keydown={(ev)=>{
    if (ev.key === "Delete") {
        ev.preventDefault()
        IDB.joeys.delete(id)
    }
}} class="w-full h-16 bg-slate-300 dark:bg-slate-700 rounded-md shadow-md flex hover:shadow-xl hover:outline outline-1 transition-all outline-slate-400 dark:outline-slate-600 p-2">
    <a href={url} class="flex w-full gap-2">
        <div class="aspect-square h-full grid place-items-center">
            <img class="max-h-[70%]" src={icon} alt={title} />
        </div>
        <div class="grid place-items-center overflow-hidden h-full">
            <p
            class="line-clamp-1 font-sans-bold text-xl text-neutral-800 dark:text-neutral-200"
          >
            {title}
          </p>
        </div>
    </a>
    <button
        on:focusout={()=>{deletionState=0}}
        on:click|preventDefault={()=>{
            deletionState++
        }}
        class={twMerge("aspect-square h-full grid place-items-center transition-colors rounded-md",
        deletionState === 0 ? "bg-slate-400 dark:bg-slate-600 dark:bg-opacity-0 bg-opacity-0"
        : "bg-red-600 dark:bg-red-400 dark:bg-opacity-75 bg-opacity-75",
        "hover:bg-opacity-100 dark:hover:bg-opacity-100")}>
        <IconTrash class={deletionState===1?"text-slate-300 dark:text-slate-700":"text-red-600 dark:text-red-400"}/>
    </button>
</div>