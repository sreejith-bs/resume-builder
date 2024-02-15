<script>
	import Title from '../../components/Form/Title.svelte';

	export let hobbies = {
		hobbies_heading: '',
		hobbies: '',
		is_active: true
	};

	let defaultTitle = 'Hobbies';
	let title = hobbies.hobbies_heading ? hobbies.hobbies_heading : defaultTitle;
	$: {
		hobbies.hobbies_heading = title;
	}
</script>

<div id="hobbies">
	<div class="pt-4">
		<Title bind:title />
		<!-- <h3 class="h3">Hobbies</h3> -->
	</div>
	<label class="label">
		<span class="text-sm tracking-wider">What do you like?</span>
		<textarea
			name="hobbies"
			id="hobbies"
			bind:value={hobbies.hobbies}
			class="textarea tracking-wider rounded-sm border-0 border-s-4"
			rows="4"
			placeholder="e.g. Drawing, Cricket, Reading"
		/>
	</label>
</div>
