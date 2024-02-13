<script>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

    import Title from '../../components/Form/Title.svelte';

    let skills_heading = 'Skills';
</script>
<div id="skills">
    <div class="pt-4">
        <Title title={skills_heading} />
        <!-- <h3 class="h3">Skills</h3> -->
    </div>
    <Accordion rounded="rounded-none">
        <AccordionItem>
            <!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
            <svelte:fragment slot="summary">
                <h4 class="font-bold tracking-wider">Team Management</h4>
                <h5 class="text-sm tracking-wider">Expert</h5>
            </svelte:fragment>
            <svelte:fragment slot="content">
                <div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-3">
                    <label class="label">
                        <h5 class="text-sm tracking-wider">Skill</h5>
                        <input
                            class="input tracking-wider rounded-sm border-0 border-s-4"
                            type="text"
                            placeholder="..."
                        />
                    </label>
                    <label class="label">
                        <h5 class="text-sm tracking-wider">Level</h5>
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