<script>
	import { onMount } from 'svelte';
	export let name ;
	export let jobTitle;
</script>

<div>
	<div class="grid grid-flow-col grid-rows-2 pb-20 pt-4">
		<div class="row-span-3 w-[140px]">
			<img src="../../../Profile-avatar.png" alt="image of resume building peopele" />
		</div>
		<div class="col-span-6"></div>
		<div class="col-span-6 flex items-center">
			<h3 class="text-[50px] font-bold">{name}</h3>
		</div>
		<h5 class="h5 font-bold">{jobTitle}</h5>
	</div>
</div>
