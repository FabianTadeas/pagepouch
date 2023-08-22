<script lang="ts">
    import IDB from "../../IDB";
    import { IconLoader2 } from "@tabler/icons-svelte"
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher<{done: undefined}>()

    async function checkForDuplicates(url:string) {
        const existing = await IDB.joeys.where("url").equals(url).toArray()
        return existing.length > 0
    }

    function addJoey(title:string, url:string, icon:string) {
        return IDB.joeys.add({
            title: title,
            added: new Date().getTime(),
            url: url,
            icon: icon
        })
    }

    let duplicate = false
    
    let tab: chrome.tabs.Tab;
    
    function finish() {
        addJoey(tab.title,tab.url,tab.favIconUrl)
        dispatch("done")
    }

    chrome.tabs.query({active:true,currentWindow:true}, async (tabs)=>{
        tab = tabs[0]
        duplicate = await checkForDuplicates(tab.url)
        if (!duplicate) finish()
    });
</script>
<div class="text-base dark:text-slate-200 text-slate-800">
    {#if duplicate}
        <div class="text-center min-w-max">
            This tab is already in your pouch. <br /> what do you want to do?
            <div class="flex gap-4 w-full mt-4">
                <button on:click={()=>{
                    finish()
                }} class="py-2 bg-slate-300 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-700 rounded-md px-4 bg-opacity-0 hover:bg-opacity-50 dark:bg-opacity-0 hover:dark:bg-opacity-50 transition-all">Add again!</button>
                <button on:click={()=>{
                    window.close()
                }} class="py-2 bg-slate-300 dark:bg-slate-700 rounded-md px-4 hover:bg-opacity-50 hover:dark:bg-opacity-50 transition-all">Don't add</button>
            </div>
        </div>
    {:else}
        <div class="flex gap-4 animate-pulse min-w-max">
            <IconLoader2 class="animate-spin" />
            Processing!
        </div>
    {/if}
</div>