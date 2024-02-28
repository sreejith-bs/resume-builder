<script>
	export let details;
</script>

<div>
	{#if details.theme !== 'theme3'}
		<h3 class="h3 py-2 font-bold">{details.certificate_heading}</h3>
		<hr />
		<div>
			{#each details.certificate as item}
				<div class="pt-2">
					<h4 class="h4 font-bold">{item.label}</h4>
					<p class="font-semibold">{item.url}</p>
				</div>
			{/each}
		</div>
	{:else}
		<h3 class="h3 py-2 font-bold uppercase tracking-widest">{details.certificate_heading}</h3>
		{#each details.certificate as item}
			<h5 class="h5 font-bold">{item.label}</h5>
			<p class="font-semibold">{item.url}</p>
		{/each}
	{/if}
</div>
