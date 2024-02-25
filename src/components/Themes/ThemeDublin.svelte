<script>
    import Body from "./ThemeBlocks/Body.svelte";
    import ResumeTitleBlock from "./ThemeBlocks/ResumeTitleBlock.svelte";
    import SideBar from "./ThemeBlocks/SideBar.svelte";
</script>

<div class="container h-screen mx-auto py-6 px-8 w-[794px] h-[1122px] scale-75 bg-slate-50">
    <ResumeTitleBlock/>
    <div class="grid grid-rows-3 grid-flow-col gap-10">
        <div class="row-span-3 col-span-3"><Body /></div>
        <div class="row-span-1 bg-blue-950 p-4 text-slate-50"><SideBar /></div>
      </div>
</div>
<style>

</style>