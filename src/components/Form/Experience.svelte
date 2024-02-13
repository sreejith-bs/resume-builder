<script>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

    import Title from '../../components/Form/Title.svelte';

    let experience_heading = 'Employment History';
</script>
<div id="experience">
    <div class="pt-4">
        <Title title={experience_heading} />
        <!-- <h3 class="h3">Employment History</h3> -->
    </div>
    <Accordion rounded="rounded-none">
        <AccordionItem>
            <!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
            <svelte:fragment slot="summary">
                <h4 class="font-bold tracking-wider">Front-End Developer</h4>
                <h5 class="text-sm tracking-wider">Jan 2016-Apr 2019</h5>
            </svelte:fragment>
            <svelte:fragment slot="content">
                <div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-3">
                    <label class="label">
                        <h5 class="text-sm tracking-wider">Job Title</h5>
                        <input
                            class="input tracking-wider rounded-sm border-0 border-s-4"
                            type="text"
                            placeholder="..."
                        />
                    </label>
                    <label class="label">
                        <h5 class="text-sm tracking-wider">Employer</h5>
                        <input
                            class="input tracking-wider rounded-sm border-0 border-s-4"
                            type="text"
                            placeholder="..."
                        />
                    </label>
                </div>
                <div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-3">
                    <label class="label">
                        <h5 class="text-sm tracking-wider">Start Date</h5>
                        <input
                            class="input tracking-wider rounded-sm border-0 border-s-4"
                            type="text"
                            placeholder="..."
                        />
                    </label>
                    <label class="label">
                        <h5 class="text-sm tracking-wider">End Date</h5>
                        <input
                            class="input tracking-wider rounded-sm border-0 border-s-4"
                            type="text"
                            placeholder="..."
                        />
                    </label>
                </div>
                <div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-3">
                    <label class="label">
                        <h5 class="text-sm tracking-wider">City</h5>
                        <input
                            class="input tracking-wider rounded-sm border-0 border-s-4"
                            type="text"
                            placeholder="..."
                        />
                    </label>
                    <label class="label">
                        <h5 class="text-sm tracking-wider">Country</h5>
                        <input
                            class="input tracking-wider rounded-sm border-0 border-s-4"
                            type="text"
                            placeholder="..."
                        />
                    </label>
                </div>
                <label class="label">
                    <span class="text-sm tracking-wider"
                        >Description</span
                    >
                    <textarea
                        class="textarea tracking-wider rounded-sm border-0 border-s-4"
                        rows="4"
                        placeholder="e.g. Driven Front-End Developer with diverse skills seeking opportunity to..."
                    />
                </label>
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
</div>