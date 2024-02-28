<script>
	export let details;
</script>

<div>
	{#if details.theme !== 'theme3'}
		<h3 class="h3 py-2 font-bold">{details.skills_heading}</h3>
		<hr />
		<ul class="pt-2">
			{#each details.skills as item}
				<li>{item.label}</li>
			{/each}
		</ul>
	{:else}
		<h3 class="h3 py-2 font-bold uppercase tracking-widest">{details.skills_heading}</h3>
		<ul class="py-2">
			{#each details.skills as item}
				<li>{item.label}</li>
			{/each}
		</ul>
	{/if}
</div>
