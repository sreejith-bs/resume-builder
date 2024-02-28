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
	let editUrl = `/landing-page/form/edit/`;
	// let previewUrl;

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
		console.log('currentPage', currentPage);

		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		currentPageItems = allResumeDetails.slice(startIndex, endIndex);
		console.log('currentPageItems', currentPageItems);
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
	const getResume = async (resumeId) => {
		loading = true;
		const response = await fetch(`/api/${resumeId}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
			.then((response) => {
				if (response.ok) {
					loading = false;
					return response.json();
				} else {
					alertMessage('error', 'Oops, something went wrong');
				}
			})
			.then((data) => {
				resumeDetails = data.data.event?.responseBody;
				updateResumeDetails(resumeDetails);
				console.log('resumeDetails', resumeDetails);
			})
			.catch((error) => {
				loading = false;
				console.error('Error', error);
			});
	};
	async function viewResume(resumeId, action) {
		await getResume(resumeId);
		if (action === 'view') showPopup('component', 'modalComponentFullScreen');
		// else previewUrl = `${baseUrl}${resumeDetails.theme}`;
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
	{#if allResumeDetails.length}
		<div class="grid gap-x-14 py-4 text-slate-50 md:grid-cols-2 lg:grid-cols-4">
			{#each currentPageItems as item}
				<div
					class:background-img1={item.theme === 'theme1'}
					class:background-img2={item.theme === 'theme2'}
					class:background-img3={item.theme === 'theme3'}
				>
				<!-- class:placeholder={loading}
						class:animate-pulse={loading} -->
					<div class="content card card-hover rounded-none">
						<header class="card-header">
							<span class="font-bold">Job Title:</span>
							{item.job_title}
						</header>
						<section class="p-4">
							<p><span class="font-bold">Name:</span> {item.first_name} {item.last_name}</p>
							<p><span class="font-bold">Email:</span> {item.email}</p>
							<p class="line-clamp-5">
								<span class="font-bold">Profile Summary:</span>
								<span>{item.profile_description}</span>
							</p>
							<p>
								<span class="font-bold">Template:</span>
								{item.theme === 'theme1' ? 'Dublin' : item.theme === 'theme2' ? 'Madrid' : 'Sydney'}
							</p>
						</section>
						<footer class="card-footer grid h-40 grid-cols-3 content-end gap-4">
							<button
								type="button"
								class="variant-filled btn btn-sm"
								on:click={deleteResume(item.id)}>Delete</button
							>
							<!-- <button
								type="button"
								class="variant-filled btn btn-sm"
								on:click={() => {
									viewResume(item.id, 'view');
								}}>View</button
							> -->
							<a href="{editUrl}{item.theme}/{item.id}" class="variant-filled btn btn-sm"
								><button type="button">Edit</button></a
							>
						</footer>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex justify-end gap-4">
			<button
				type="button"
				class="variant-filled btn"
				on:click={previousPage}
				disabled={currentPage === 1}>Previous</button
			>
			<button
				type="button"
				class="variant-filled btn"
				on:click={nextPage}
				disabled={currentPage * itemsPerPage === allResumeDetails.length}>Next</button
			>
		</div>
	{:else}
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

<style>
	.background-img1 {
		background-image: url('../ThemeDublinBlur.png');
		background-size: cover;
		background-repeat: no-repeat;
		/* filter: blur(8px);
		-webkit-filter: blur(8px); */
	}
	.background-img2 {
		background-image: url('../ThemeMadridBlur.png');
		background-size: cover;
		background-repeat: no-repeat;
	}
	.background-img3 {
		background-image: url('../ThemeSydneyBlur.png');
		background-size: cover;
		background-repeat: no-repeat;
	}
	.content {
		background-color: rgba(0, 0, 0, 0.8);
	}
</style>
