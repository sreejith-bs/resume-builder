<script>
    import Body from "./ThemeBlocks/Body.svelte";
    import ResumeTitleBlock from "./ThemeBlocks/ResumeTitleBlock.svelte";
    import SideBar from "./ThemeBlocks/SideBar.svelte";
</script>

<div class="container w-3/5 h-screen mx-auto p-4">
    <ResumeTitleBlock/>
    <div class="grid grid-rows-3 grid-flow-col gap-7">
        <div class="row-span-3 col-span-3"><Body /></div>
        <div class="row-span-2"><SideBar /></div>
      </div>
</div>