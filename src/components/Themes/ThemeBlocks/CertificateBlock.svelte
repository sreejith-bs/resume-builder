<script>
	export let details;
</script>
<div>
	<h3 class="h3 py-2 font-bold">{details.certificate_heading}</h3>
	<hr />
	<div>
		{#each details.certificate as item}
			<div class="pt-2">
				<h4 class="h4 font-bold">{item.label}</h4>
				<h5 class="h5 font-semibold">{item.url}</h5>
			</div>
		{/each}
	</div>
</div>