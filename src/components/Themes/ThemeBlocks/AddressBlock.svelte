<script>
	export let details;
</script>
<div>
	<h3 class="h3 font-bold py-2">Details</h3>
	<hr />
	<div>
		<div class="pt-2">
			<p>{details.address}, {details.city}, {details.country}</p>
			<p>PIN {details.postal_code}</p>
		</div>
	</div>
</div>
