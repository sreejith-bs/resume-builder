<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { addressData, userDetailsData } from '../../store/store.js';
	import DatePicker from '../DatePicker.svelte';
	import { errors } from '../../store/store.js';
	import { validateForm } from '$lib/validation/validation.js';
	import { formatDate } from '$lib/utils.js';

	let address = $addressData;
	let userDetails = $userDetailsData;
	let dateOfBirth = new Date();
	// let date_of_birth;
	let fieldError = $errors;

	$: {
		// address.date_of_birth = date;
		// date_of_birth = new Date(dateOfBirth).toLocaleDateString()

		userDetailsData.update((data) => ({
			...data,
			date_of_birth: dateOfBirth
		}));
		// console.log('address', address);
		fieldError = $errors;
		address = $addressData;
	}

	const updateAddressDetails = (field, value, dataType) => {
		if (dataType === 'address')
			addressData.update((data) => ({
				...data,
				[field]: value
			}));
		else
			userDetailsData.update((data) => ({
				...data,
				[field]: value
			}));
	};
</script>

<div id="address">
	<Accordion rounded="rounded-none" hover="hover:none" padding="padding-0 pt-3">
		<AccordionItem open>
			<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
			<svelte:fragment slot="summary"
				><h4 class="font-bold tracking-wider">Additional details</h4></svelte:fragment
			>
			<svelte:fragment slot="content">
				<div class="grid gap-4 pt-3 md:grid-cols-2 md:gap-10">
					<label class="label">
						<h5 class="text-sm tracking-wider">Address</h5>
						<input
							name="address"
							id="address"
							bind:value={address.address}
							on:input={() => updateAddressDetails('address', address.address, 'address')}
							on:blur={validateForm('address', address.address, 'address', 'nested')}
							class="input rounded-sm border-0 border-s-4 tracking-wider"
							type="text"
							placeholder="..."
						/>
						{#if fieldError.address?.address}<p id="errorContainer" class="error">{fieldError.address?.address}</p>{/if}
					</label>
					<label class="label">
						<h5 class="text-sm tracking-wider">Postal Code</h5>
						<input
							name="postal_code"
							id="postal_code"
							bind:value={address.postal_code}
							on:input={() => updateAddressDetails('postal_code', address.postal_code, 'address')}
							on:blur={validateForm('postal_code', address.postal_code, 'address', 'nested')}
							class="input rounded-sm border-0 border-s-4 tracking-wider"
							type="text"
							placeholder="..."
						/>
						{#if fieldError.address?.postal_code}<p id="errorContainer" class="error">
								{fieldError.address?.postal_code}
							</p>{/if}
					</label>
				</div>
				<div class="grid gap-4 pt-3 md:grid-cols-2 md:gap-10">
					<label class="label">
						<h5 class="text-sm tracking-wider">Driving License</h5>
						<input
							name="driving_license"
							id="driving_license"
							bind:value={address.driving_license}
							on:input={() =>
								updateAddressDetails('driving_license', address.driving_license, 'address')}
							on:blur={validateForm(
								'driving_license',
								address.driving_license,
								'address',
								'nested'
							)}
							class="input rounded-sm border-0 border-s-4 tracking-wider"
							type="text"
							placeholder="..."
						/>
						{#if fieldError.address?.driving_license}<p id="errorContainer" class="error">
								{fieldError.address?.driving_license}
							</p>{/if}
					</label>
					<label class="label">
						<h5 class="text-sm tracking-wider">Nationality</h5>
						<input
							name="nationality"
							id="nationality"
							bind:value={address.nationality}
							on:input={() => updateAddressDetails('nationality', address.nationality, 'address')}
							on:blur={validateForm('nationality', address.nationality, 'address', 'nested')}
							class="input rounded-sm border-0 border-s-4 tracking-wider"
							type="text"
							placeholder="..."
						/>
						{#if fieldError.address?.nationality}<p id="errorContainer" class="error">
								{fieldError.address?.nationality}
							</p>{/if}
					</label>
				</div>
				<div class="grid gap-4 pt-3 md:grid-cols-2 md:gap-10">
					<label class="label">
						<h5 class="text-sm tracking-wider">Place Of Birth</h5>
						<input
							name="place_of_birth"
							id="place_of_birth"
							bind:value={address.place_of_birth}
							on:input={() =>
								updateAddressDetails('place_of_birth', address.place_of_birth, 'address')}
							on:blur={validateForm('place_of_birth', address.place_of_birth, 'address', 'nested')}
							class="input rounded-sm border-0 border-s-4 tracking-wider"
							type="text"
							placeholder="..."
						/>
						{#if fieldError.address?.place_of_birth}<p id="errorContainer" class="error">
								{fieldError.address?.place_of_birth}
							</p>{/if}
					</label>
					<label class="label">
						<h5 class="text-sm tracking-wider">Date Of Birth</h5>
						<DatePicker
							bind:date={dateOfBirth}
							id="date_of_birth"
							on:dateChange={updateAddressDetails('date_of_birth', dateOfBirth, 'user')}
						/>
						{#if fieldError.date_of_birth}<p id="errorContainer" class="error">{fieldError.date_of_birth}</p>{/if}
					</label>
				</div>
				<div class="space-y-2">
					<label class="flex items-center space-x-2">
						<input
							class="checkbox"
							type="checkbox"
							checked={address.is_active}
							on:change={() => updateAddressDetails('is_active', !address.is_active, 'address')}
						/>
						<p>Section Active</p>
					</label>
				</div>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>
