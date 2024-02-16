<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { addressData } from '../../store/store.js';
	import DatePicker from '../DatePicker.svelte';

	let address = $addressData;
	let date = new Date();

	$: {
		// address.dob = date;
		addressData.update((data) => ({
			...data,
			dob: date
		}));
		// console.log('address', address);
	}

	const updateAddressDetails = (field, value) => {
		addressData.update((data) => ({
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
				<div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-3">
					<label class="label">
						<h5 class="text-sm tracking-wider">Address</h5>
						<input
							name="address"
							id="address"
							bind:value={address.address}
							on:input={() => updateAddressDetails('address', address.address)}
							class="input tracking-wider rounded-sm border-0 border-s-4"
							type="text"
							placeholder="..."
						/>
					</label>
					<label class="label">
						<h5 class="text-sm tracking-wider">Postal Code</h5>
						<input
							name="postal_code"
							id="postal_code"
							bind:value={address.postal_code}
							on:input={() => updateAddressDetails('postal_code', address.postal_code)}
							class="input tracking-wider rounded-sm border-0 border-s-4"
							type="text"
							placeholder="..."
						/>
					</label>
				</div>
				<div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-3">
					<label class="label">
						<h5 class="text-sm tracking-wider">Driving License</h5>
						<input
							name="driving_license"
							id="driving_license"
							bind:value={address.driving_license}
							on:input={() => updateAddressDetails('driving_license', address.driving_license)}
							class="input tracking-wider rounded-sm border-0 border-s-4"
							type="text"
							placeholder="..."
						/>
					</label>
					<label class="label">
						<h5 class="text-sm tracking-wider">Nationality</h5>
						<input
							name="nationality"
							id="nationality"
							bind:value={address.nationality}
							on:input={() => updateAddressDetails('nationality', address.nationality)}
							class="input tracking-wider rounded-sm border-0 border-s-4"
							type="text"
							placeholder="..."
						/>
					</label>
				</div>
				<div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-3">
					<label class="label">
						<h5 class="text-sm tracking-wider">Place Of Birth</h5>
						<input
							name="place_of_birth"
							id="place_of_birth"
							bind:value={address.place_of_birth}
							on:input={() => updateAddressDetails('place_of_birth', address.place_of_birth)}
							class="input tracking-wider rounded-sm border-0 border-s-4"
							type="text"
							placeholder="..."
						/>
					</label>
					<label class="label">
						<h5 class="text-sm tracking-wider">Date Of Birth</h5>
						<DatePicker bind:date id="dob"/>
					</label>
				</div>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>
