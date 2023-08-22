<script lang="ts">
    import Processing from "./lib/Processing.svelte";
    import Done from "./lib/Done.svelte";

    let done = false
</script>

{#if done}
    <Done />
{:else}
    <Processing 
        on:done={()=>{
            done=true
        }}
    />
{/if}