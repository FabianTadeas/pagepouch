<script lang="ts">
  import {
    IconSearch,
    IconBrowserPlus,
    IconFolderPlus,
    IconUser,
    IconSettings,
    IconTestPipe,
    IconCup,
    IconBrandGithub,
  } from "@tabler/icons-svelte";
  import IDB from "../../IDB";
  import activeDir from "../utils/activeDirectoryId";
</script>

<nav
  class="dark:text-white text-base font-sans-bold flex justify-between px-16"
>
  <a
    class="p-2 underline-offset-2 hover:underline flex gap-2 active-outline rounded-md"
    href="https://github.com/FabianTadeas/pagepouch"
  >
    <img src="/favicon.svg" alt="" />
    {chrome.i18n.getMessage("extName")}
  </a>
  <div class="flex gap-6">
    <a
      class="p-2 transition-colors hover:text-accent active-outline rounded-md"
      href="https://www.buymeacoffee.com/tadafaba"
    >
      <IconCup />
    </a>
    <button
      class="p-2 transition-colors hover:text-accent active-outline rounded-md"
      on:click={() => {
        let title = prompt("title");
        IDB.tiles.add({
          type: "directory",
          title,
          added: new Date().getTime(),
          parentId: $activeDir,
        });
      }}
    >
      <IconFolderPlus />
    </button>
    <button
      class="p-2 transition-colors hover:text-accent active-outline rounded-md"
      on:click={() => {
        let title = prompt("title");
        let url = prompt("url");
        IDB.tiles.add({
          type: "bookmark",
          title,
          added: new Date().getTime(),
          url,
          parentId: $activeDir,
        });
      }}
    >
      <IconBrowserPlus />
    </button>
    <button class="p-2 transition-colors hover:text-accent active-outline rounded-md">
      <IconSettings />
    </button>
    <button
      class="p-2 transition-all hover:text-accent"
      on:click={() => {
        location.hash = prompt("id");
      }}
    >
      <IconTestPipe />
    </button>
  </div>
  <!-- <div /> -->
  <button class="p-2 underline-offset-2 hover:underline flex gap-2 active-outline rounded-md">
    Log In
    <IconUser />
  </button>
</nav>
