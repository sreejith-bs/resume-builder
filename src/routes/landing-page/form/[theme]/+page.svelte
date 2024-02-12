<script>
    import Form from "../../../../components/Form.svelte";
    import { page } from "$app/stores";

    // @params {any} params
    console.log('params', $page.params.theme)
    const params = $page.params.theme;
</script>

<Form theme={params} />