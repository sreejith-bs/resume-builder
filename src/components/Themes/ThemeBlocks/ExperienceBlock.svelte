<script>
	export let details;
	
	function getDate(date) {
		return new Date(date).toLocaleDateString();
	}
</script>

<div>
	<h3 class="h3 py-2 font-bold">{details.experience_heading}</h3>
	<hr />
	<div>
		{#each details.experience as item}
			<div class="pt-2">
				<h4 class="h4 font-bold">{item.job_title}</h4>
				<h5 class="h5 font-semibold">{item.employer}</h5>
				<p class="text-slate-500">{getDate(item.start_date)}-{getDate(item.end_date)}</p>
			</div>
			<p>
				{item.description}
			</p>
		{/each}
	</div>
</div>
