<script>
	export let details;
</script>

{#if details.theme !== 'theme3'}
	<div>
		<h3 class="h3 py-2 font-bold">{details.profile_heading}</h3>
		<hr />
		<p class="py-2">
			{details.profile_description}
		</p>
	</div>
{:else}
	<div class="">
		<h3 class="h3 py-2 font-bold uppercase tracking-widest">{details.job_title}</h3>
		<p class="py-2">
			{details.profile_description}
		</p>
	</div>
{/if}
