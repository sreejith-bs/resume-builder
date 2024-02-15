<script>
	import Title from '../../components/Form/Title.svelte';

	export let profile = {
		profile_heading: '',
		profile_description: ''
	};

	let defaultTitle = 'My Profile';
	let title = profile.profile_heading ? profile.profile_heading : defaultTitle;
	$: {
		profile.profile_heading = title;
	}
</script>

<div id="profile">
	<div class="py-4">
		<Title bind:title />
		<!-- <h3 class="h3">My Profile</h3> -->
	</div>
	<label class="label">
		<span class="text-sm tracking-wider"
			>Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience &
			most importantly - your biggest achievements, best qualities and skills.</span
		>
		<textarea
			name="profile_description"
			id="profile_description"
			bind:value={profile.profile_description}
			class="textarea tracking-wider rounded-sm border-0 border-s-4"
			rows="4"
			placeholder="e.g. Driven Front-End Developer with diverse skills seeking opportunity to..."
		/>
	</label>
</div>
