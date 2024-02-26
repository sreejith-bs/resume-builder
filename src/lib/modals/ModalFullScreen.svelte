<script lang="ts">
	import type { SvelteComponent } from 'svelte';
    import ThemeDublin from '../../components/Themes/ThemeDublin.svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	const modalStore = getModalStore();

	// Notes: Use `w-screen h-screen` to fit the visible canvas size.
	const cBase = 'bg-surface-100-800-token w-screen h-full p-4';
</script>

{#if $modalStore[0]}
	<div>
		<div class="">
			<ThemeDublin />
		</div>
		<div class="flex flex-col items-center pb-5">
			<button type="button" class="variant-filled btn" on:click={parent.onClose}>× Close</button>
		</div>
	</div>
{/if}
