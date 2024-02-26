<script>
    import Form from "./Form/Form.svelte";
    import ThemeWrapper from "./Themes/ThemeWrapper.svelte";
    import { page } from "$app/stores";

    console.log('params', $page.params)
    const resumeTheme = $page.params.theme;
    const resumeId = $page.params.id;

</script>
<div class="grid grid-cols-2">
    <div class="h-screen overflow-y-auto">
        <Form theme={resumeTheme}  id={resumeId}/>
    </div>
    <div class="bg-slate-500/50">
        <ThemeWrapper theme={resumeTheme}/>
    </div>
</div>