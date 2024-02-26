<script>
	export let details;
</script>

<div>
	<h3 class="h3 py-2 font-bold">{details.social_media_heading}</h3>
	<hr />
	<ul class="pt-2">
		{#each details.social_media as item}
			<li>{item.label}</li>
		{/each}
	</ul>
</div>
