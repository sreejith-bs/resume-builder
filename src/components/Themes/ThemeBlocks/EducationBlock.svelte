<script>
	import { formatDate } from '$lib/utils';
	export let details;

	function getDate(date) {
		return new Date(date).toLocaleDateString();
	}
</script>

<div>
	{#if details.theme !== 'theme3'}
		<h3 class="h3 py-2 font-bold">{details.education_heading}</h3>
		<hr />
		<div>
			{#each details.education as item}
				<div class="pt-2">
					<h4 class="h4 font-bold">{item.course}</h4>
					<p class="font-semibold">{item.institution}</p>
					<p class="text-slate-500">
						{getDate(item.start_date)}-{item.current_status ? 'Present' : getDate(item.end_date)}
					</p>
					<p>
						{item.description}
					</p>
				</div>
			{/each}
		</div>
	{:else}
		<h3 class="h3 py-2 font-bold uppercase tracking-widest">{details.education_heading}</h3>
		{#each details.education as item}
			<h5 class="h5">
				<span class="font-bold"
					>{item.course} at {item.institution}, {item.city}, {item.country}<br />
					{formatDate(item.start_date)}-{item.current_status
						? 'Present'
						: formatDate(item.end_date)}
				</span>
			</h5>
			<p class="py-2">
				{item.description}
			</p>
		{/each}
	{/if}
</div>
