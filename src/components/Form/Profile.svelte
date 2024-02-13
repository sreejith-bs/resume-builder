<script>
    import Title from '../../components/Form/Title.svelte';

    let profile_heading = 'My Profile';
</script>
<div id="profile">
    <div class="py-4">
        <Title title={profile_heading}/>
        <!-- <h3 class="h3">My Profile</h3> -->
    </div>
    <label class="label">
        <span class="text-sm tracking-wider"
            >Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience
            & most importantly - your biggest achievements, best qualities and skills.</span
        >
        <textarea
            class="textarea tracking-wider rounded-sm border-0 border-s-4"
            rows="4"
            placeholder="e.g. Driven Front-End Developer with diverse skills seeking opportunity to..."
        />
    </label>
</div>