<script>
	import ThemeDublin from './ThemeDublin.svelte';
	import ThemeMadrid from './ThemeMadrid.svelte';
	import ThemeSydney from './ThemeSydney.svelte';

	export let theme;
</script>

<div class="scale-75">
	{#if theme === 'theme1'}
		<ThemeDublin />
	{:else if theme === 'theme2'}
		<ThemeMadrid />
	{:else}
		<ThemeSydney />
	{/if}
</div>
