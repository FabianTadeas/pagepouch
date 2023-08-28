<script lang="ts">
  import Stack from "./lib/Stack.svelte";
  import Nav from "./lib/Nav.svelte";
  import Main from "./lib/Main.svelte";
  import { theme } from "../preferences";

  const schemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
  let systemDark = schemeMedia.matches;
  schemeMedia.onchange = ({ matches }) => systemDark = matches;

  $: dark =
    $theme.neutral === "dark" || ($theme.neutral === "auto" && systemDark);
</script>

<div style:--accent={$theme.accent} class:dark>
  <div
    class="w-screen h-screen flex bg-neutral-100 dark:bg-neutral-800 bg-gradient-to-r p-1 from-transparent from-75% to-accent gap-1"
  >
    <div class="grow flex flex-col py-10 gap-14">
      <Nav />
      <Main />
    </div>
    <Stack />
  </div>
</div>
