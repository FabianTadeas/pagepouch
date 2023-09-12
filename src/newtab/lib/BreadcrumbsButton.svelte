<script lang="ts">
  import drop from "../utils/drop";

  export let id: number;

  let dropReady = false;
  let timeout: NodeJS.Timeout;
  $: dropReady
    ? (timeout = setTimeout(() => (location.hash = "#" + id), 1000))
    : clearTimeout(timeout);
</script>

<button
  on:click={() => {
    location.hash = "#" + id;
  }}
  use:drop={{ id }}
  on:dropready={() => (dropReady = true)}
  on:dropreadyend={() => (dropReady = false)}
  class="last:text-neutral-800 last:dark:text-neutral-300 px-2 rounded-md group {dropReady
    ? 'outline outline-2 -outline-offset-2 outline-accent'
    : 'active-outline'}"
>
  <slot />
</button>
