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
</script>

<nav
  class="dark:text-white text-base font-sans-bold flex justify-between px-16"
>
  <a
    class="p-2 underline-offset-2 hover:underline flex gap-2"
    href="https://github.com/FabianTadeas/pagepouch"
  >
    <img src="/favicon.svg" alt="" />
    {chrome.i18n.getMessage("extName")}
  </a>
  <div class="flex gap-6">
    <button class="p-2 transition-all hover:text-accent">
      <IconSearch />
    </button>
    <button class="p-2 transition-all hover:text-accent">
      <IconFolderPlus />
    </button>
    <button class="p-2 transition-all hover:text-accent">
      <IconBrowserPlus />
    </button>
    <button class="p-2 transition-all hover:text-accent">
      <IconSettings />
    </button>
    <button
      class="p-2 transition-all hover:text-accent"
      on:click={() => {
        // history.pushState(undefined, "", "bar.html");
        location.hash = location.hash === "#-1" ? "#-2" : "#-1"
      }}
    >
      <IconTestPipe />
    </button>
    <button class="p-2 transition-all hover:text-accent">
      <IconBrandGithub />
    </button>
    <a
      class="p-2 transition-all hover:text-accent"
      href="https://www.buymeacoffee.com/tadafaba"
    >
      <IconCup />
    </a>
  </div>
  <button class="p-2 underline-offset-2 hover:underline flex gap-2">
    Log In
    <IconUser />
  </button>
</nav>
