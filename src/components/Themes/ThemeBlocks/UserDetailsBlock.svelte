<script>
	export let details;
</script>

{#if details.theme !== 'theme3'}
	<div>
		<p>Phone: {details.phone}</p>
		<p>Email: {details.email}</p>
	</div>
{:else}
	<div class="w-[275px] text-[50px] font-semi-bold uppercase tracking-widest break-words leading-none">
		<p>{details.phone}</p>
		<p>{details.email}</p>
	</div>
{/if}
