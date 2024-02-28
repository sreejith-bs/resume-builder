<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { certificateData } from '../../store/store.js';
	import Title from '../../components/Form/Title.svelte';
	import { errors } from '../../store/store.js';
	import { validateForm } from '$lib/validation/validation.js';

	let certificate = $certificateData;
	let fieldError = $errors.certificate;

	function add() {
		// certificate.data = certificate.data.concat({
		// 	label: '',
		// 	url: '',
		// 	is_active: true
		// });
		certificateData.update((data) => ({
			...data,
			data: [...data.data, {}] // Add a new empty object to the array
		}));
	}
	function remove(index = 0) {
		// certificate.data = certificate.data.filter((cert, deleteIndex) => index !== deleteIndex);
		certificateData.update((data) => ({
			...data,
			data: data.data.filter((item, i) => i !== index)
		}));
	}

	let defaultTitle = 'Certificate';
	let title = certificate.certificate_heading ? certificate.certificate_heading : defaultTitle;

	$: {
		// certificate.certificate_heading = title;
		certificateData.update((data) => ({
			...data,
			certificate_heading: title
		}));
		certificate = $certificateData;
		fieldError = $errors.certificate;
	}

	const updateCertificateDetails = (field, value, index = 0) => {
		certificateData.update((data) => {
			data.data[index][field] = value;
			return data;
		});
	};
</script>

<div id="certificate">
	<div class="pt-4">
		<Title bind:title />
		<!-- <h3 class="h3">Certificate</h3> -->
	</div>
	{#each certificate.data as cert, index}
		<Accordion rounded="rounded-none">
			<AccordionItem open>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">
					<div class="flex flex-row">
						<div class="basis-1/6">
							<h4 class="font-bold tracking-wider">
								{cert.label ? cert.label : '(Not Specified)'}
							</h4>
						</div>
						<div>
							{#if index !== 0}
								<button
									type="button"
									class="variant-filled btn btn-sm"
									on:click={() => remove(index)}>Delete</button
								>
							{/if}
						</div>
					</div>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="grid gap-4 md:grid-cols-2 md:gap-10">
						<label class="label">
							<h5 class="text-sm tracking-wider">Course</h5>
							<input
								name="label"
								id={`label-${index}`}
								bind:value={cert.label}
								on:input={() => updateCertificateDetails('label', cert.label, index)}
								on:blur={validateForm('label', cert.label, 'certificate', 'array', index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							{#if fieldError?.[index]?.label}<p id="errorContainer" class="error">{fieldError?.[index]?.label}</p>{/if}
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Url</h5>
							<input
								name="url"
								id={`url-${index}`}
								bind:value={cert.url}
								on:input={() => updateCertificateDetails('url', cert.url, index)}
								on:blur={validateForm('url', cert.url, 'certificate', 'array', index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							{#if fieldError?.[index]?.url}<p id="errorContainer" class="error">{fieldError?.[index]?.url}</p>{/if}
						</label>
					</div>
					<div class="space-y-2">
						<label class="flex items-center space-x-2">
							<input
								class="checkbox"
								type="checkbox"
								on:change={() => updateCertificateDetails('is_active', !cert.is_active, index)}
								checked={cert.is_active}
							/>
							<p>Section Active</p>
						</label>
					</div>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	{/each}
	<div class="pt-3">
		<button type="button" class="variant-filled btn btn-sm" on:click={add}
			>+ Add one more certificate</button
		>
	</div>
</div>
