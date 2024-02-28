<script>
	import { onMount, onDestroy } from 'svelte';
	import { imageData } from '../../../store/store';

	let img_details;
	let imageType;

	const unsubscribe = imageData.subscribe((value) => {
		img_details = value;
		console.log('img_details', typeof img_details);
	});

	onMount(() => {
		unsubscribe;
		imageType = typeof img_details;
	});
	// onDestroy(unsubscribe);

	export let name;
	export let jobTitle;
	export let theme;
</script>

<div>
	{#if theme === 'theme1'}
		<div class="grid grid-flow-col grid-rows-2 pb-20 pt-4">
			<div class="row-span-3 w-[140px]">
				{#if imageType === 'string'}
					<img src={$imageData} alt="Uploaded Image" class="rounded-full" />
				{:else}
					<img src="../../../../Profile-avatar.png" alt="image of resume building peopele" class="rounded-full" />
				{/if}
			</div>
			<div class="col-span-6"></div>
			<div class="col-span-6 flex items-center">
				<h3 class="text-[50px] font-bold">{name}</h3>
			</div>
			<h5 class="h5 font-bold">{jobTitle}</h5>
		</div>
	{:else if theme === 'theme2'}
		<div class="flex justify-center">
			<div class="w-[100px]">
				{#if imageType === 'string'}
					<img src={$imageData} alt="Uploaded Image" class="rounded-full" />
				{:else}
					<img src="../../../../Profile-avatar.png" class="rounded-full" alt="image of resume building peopele" />
				{/if}
			</div>
		</div>
		<div class="text-center py-6">
			<h3 class="text-[30px] font-bold pt-3">{name}</h3>
		</div>
		<div class="flex justify-center">
			<hr class="w-[30px] border-3"/>
		</div>
		<div class="text-center py-4">
			<h5 class="h5 font-bold">{jobTitle}</h5>
		</div>
		{:else}
		<div class="grid grid-cols-4 gap-4 pt-10 pb-15">
			<div class="col-span-3 py-6">
				<h3 class="text-[60px] font-bold pt-3 uppercase tracking-widest">{name}</h3>
			</div>
			<div class="w-[100px] place-self-end">
				{#if imageType === 'string'}
					<img src={$imageData} alt="Uploaded Image" />
				{:else}
					<img src="../../../../Profile-avatar.png" alt="image of resume building peopele" />
				{/if}
			</div>
		</div>
	{/if}
</div>
