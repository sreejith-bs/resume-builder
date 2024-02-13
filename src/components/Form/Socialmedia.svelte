<script>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

    import Title from '../../components/Form/Title.svelte';

    let social_media_heading = 'Website & Social Links';
</script>
<div id="socialMedia">
    <div class="pt-4">
        <Title title={social_media_heading} />
        <!-- <h3 class="h3">Website & Social Links</h3> -->
    </div>
    <Accordion rounded="rounded-none">
        <AccordionItem>
            <!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
            <svelte:fragment slot="summary">
                <h4 class="font-bold tracking-wider">Instagram</h4>
            </svelte:fragment>
            <svelte:fragment slot="content">
                <div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-3">
                    <label class="label">
                        <h5 class="text-sm tracking-wider">Label</h5>
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