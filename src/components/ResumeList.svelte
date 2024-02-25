<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { updateResumeDetails } from '../store/store';
	import ModalComponentFullScreen from '$lib/modals/ModalFullScreen.svelte';
	import { navigateTo } from '$lib/utils';
    import ThemeDublin from './Themes/ThemeDublin.svelte';

	// let source = [];
	const modalStore = getModalStore();
	let currentPage = 1;
	const itemsPerPage = 4;
	let allResumeDetails = [];
	let resumeDetails = {};
	let currentPageItems = [];
	let loading = false;
	let deleteFlag = false;
	let showResumeDetails = false;

	onMount(() => {
		loading = true;
		getResumeList();
	});

	const nextPage = () => {
		if (currentPage * itemsPerPage < allResumeDetails.length) {
			currentPage++;
			updateCurrentPageItems();
		}
	};
	const previousPage = () => {
		if (currentPage > 1) {
			currentPage--;
			updateCurrentPageItems();
		}
	};
	const updateCurrentPageItems = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		currentPageItems = allResumeDetails.slice(startIndex, endIndex);
	};
	const getResumeList = async () => {
		try {
			loading = true;
			const response = await fetch('/api', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.status === 200) {
				loading = false;
				const result = await response.json();
				allResumeDetails = result.data.event?.responseBody;
				updateCurrentPageItems();
				// source = allResumeDetails;
				console.log('details fetched successfully!', allResumeDetails);
			} else {
				loading = false;
				console.log('something went wrong!', response);
			}
		} catch (error) {
			loading = false;
			console.log('error', error);
		}
	};
	async function viewResume(resumeId) {
		try {
			loading = true;
			const response = await fetch(`/api/${resumeId}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});
			if (response.status === 200) {
				loading = false;
				const result = await response.json();
				resumeDetails = result.data.event?.responseBody;
				showResumeDetails = true;
				// showResume();
				// showPopup('component', 'modalComponentFullScreen');
				// source = allResumeDetails;
				// navigateTo('/landing-page/preview')
				console.log('details fetched successfully!', resumeDetails);
			} else {
				loading = false;
				console.log('something went wrong!', response);
			}
		} catch (error) {
			loading = false;
			console.log('viewResume-error', error);
		}
	}
	async function deleteResume(resumeId) {
		try {
			await showPopup('confirm', '', 'Please Confirm', 'Are you sure you wish to proceed?');
			if (deleteFlag) {
				loading = true;
				deleteFlag = false;
				const response = await fetch(`/api/${resumeId}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (response.status === 200) {
					loading = false;
					const result = await response.json();
					const deletedId = result.data.event?.result?.id;
					allResumeDetails = allResumeDetails.filter((details) => {
						return details.id !== deletedId;
					});
					updateResumeDetails(allResumeDetails);
					updateCurrentPageItems();
				}
			}
		} catch (error) {
			loading = false;
			console.log(error);
		}
	}
	async function showPopup(type, component = '', title = '', body = '') {
		return new Promise((resolve) => {
			const modal: ModalSettings = {
				type,
				component,
				// Data
				title,
				body,
				// TRUE if confirm pressed, FALSE if cancel pressed
				response: (r: boolean) => {
					deleteFlag = r;
					resolve(r); // Resolve the promise with the response
				}
			};
			modalStore.trigger(modal);
		});
	}
	function showResume() {
		const modalComponent: ModalComponent = {
			ref: ModalComponentFullScreen,
			props: { foo: 'bar' },
			slot: '<p>Skeleton</p>'
		};
		modalStore.trigger(modalComponent);
	}
</script>

<div>
	{#if showResumeDetails}
        <!-- <ThemeDublin /> -->
		<button type="button" class="variant-filled btn btn-sm" on:click={() => showResumeDetails = !showResumeDetails}>Close</button>
	{:else if currentPageItems.length}
		<div class="grid grid-cols-4 gap-x-14 py-4">
			{#each currentPageItems as item}
				<div
					class:placeholder={loading}
					class:animate-pulse={loading}
					class="card card-hover h-80 rounded-none text-center"
				>
					<header class="card-header">{item.job_title}</header>
					<section class="p-4">
						<p>{item.first_name} {item.last_name}</p>
						<p>{item.email}</p>
						<p>{item.profile_description}</p>
					</section>
					<footer class="card-footer">
						<button type="button" class="variant-filled btn btn-sm" on:click={deleteResume(item.id)}
							>Delete</button
						>
						<button type="button" class="variant-filled btn btn-sm" on:click={()=>{viewResume(item.id), navigateTo('/landing-page/preview')}}
							>View</button
						>
					</footer>
				</div>
			{/each}
		</div>
		<div class="flex justify-end gap-4">
			<button type="button" class="variant-filled btn" on:click={previousPage}>Previous</button>
			<button type="button" class="variant-filled btn" on:click={nextPage}>Next</button>
		</div>
	{:else if !currentPageItems.length && loading}
		<div class="grid h-40 grid-cols-1 gap-x-14 py-4">
			<div class="flex flex-col items-center justify-center text-center">
				<h1 class="mb-6 text-3xl font-bold">No Resumies Found</h1>
				<p class="mb-8 text-gray-600">
					Go to Templates page and create your <span class="text-2xl">Resume</span> within few
					<span class="text-2xl">minutes!</span>
				</p>
				<!-- <p class="mb-8 text-gray-600">
					Click the button below and create your <span class="text-2xl">Resume</span> within few <span class="text-2xl"></span>minutes!
				</p> -->
				<!-- <a href="/landing-page/create" class="rounded bg-blue-500 px-4 py-2 font-bold text-white"
					>See Templates</a
				> -->
			</div>
		</div>
	{/if}
</div>
