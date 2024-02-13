<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import Title from '../../components/Form/Title.svelte';

	let certificate_heading = 'Certificate';
</script>

<div id="certificate">
	<div class="pt-4">
		<Title title={certificate_heading} />
		<!-- <h3 class="h3">Certificate</h3> -->
	</div>
	<Accordion rounded="rounded-none">
		<AccordionItem>
			<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
			<svelte:fragment slot="summary">
				<h4 class="font-bold tracking-wider">Blockchain</h4>
				<h5 class="text-sm tracking-wider">Jan 2020-Apr 2020</h5>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-3">
					<label class="label">
						<h5 class="text-sm tracking-wider">Course</h5>
						<input
							class="input tracking-wider rounded-sm border-0 border-s-4"
							type="text"
							placeholder="..."
						/>
					</label>
					<label class="label">
						<h5 class="text-sm tracking-wider">Url</h5>
						<input
							class="input tracking-wider rounded-sm border-0 border-s-4"
							type="text"
							placeholder="..."
						/>
					</label>
				</div>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>
