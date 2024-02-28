<script>
	export let details;
</script>

<div>
	{#if details.theme !== 'theme3'}
		<h3 class="h3 py-2 font-bold">{details.hobbies_heading}</h3>
		<hr />
		<p class="pt-2">{details.hobbies.label}</p>
	{:else}
		<h3 class="h3 py-2 font-bold uppercase tracking-widest">{details.hobbies_heading}</h3>
		<p class="py-2">{details.hobbies.label}</p>
	{/if}
</div>
