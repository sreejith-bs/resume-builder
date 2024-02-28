<script>
    import Form from "../../../../../../components/Form/Form.svelte";
    import { page } from "$app/stores";
    // import FormResumeViewer from "../../../../../components/FormResumeViewer.svelte";
    const resumeTheme = $page.params.theme;
    const resumeId = $page.params.id;
    const resumeEdit = $page.params.edit;
</script>

<!-- <FormResumeViewer /> -->
<Form theme={resumeTheme}  id={resumeId} edit={resumeEdit}/>