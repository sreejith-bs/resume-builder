<script>
	import ThemeDublin from '../../../../../../components/Themes/ThemeDublin.svelte';
	import ThemeMadrid from '../../../../../../components/Themes/ThemeMadrid.svelte';
	import ThemeSydney from '../../../../../../components/Themes/ThemeSydney.svelte';
	import { page } from '$app/stores';

	const resumeTheme = $page.params.theme;
	const resumeId = $page.params.id;
	const resumeEdit = $page.params.edit;
</script>

{#if resumeTheme === 'theme1'}
	<ThemeDublin theme={resumeTheme} id={resumeId} edit={resumeEdit}/>
{:else if resumeTheme === 'theme2'}
	<ThemeMadrid theme={resumeTheme} id={resumeId} edit={resumeEdit}/>
{:else}
	<ThemeSydney theme={resumeTheme} id={resumeId} edit={resumeEdit}/>
{/if}
