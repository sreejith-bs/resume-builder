<script>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>
<div id="address">
    <Accordion rounded="rounded-none" hover="hover:none" padding="padding-0 pt-3">
        <AccordionItem>
            <!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
            <svelte:fragment slot="summary"
                ><h4 class="font-bold tracking-wider">Additional details</h4></svelte:fragment
            >
            <svelte:fragment slot="content">
                <div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-3">
                    <label class="label">
                        <h5 class="text-sm tracking-wider">Address</h5>
                        <input
                            class="input tracking-wider rounded-sm border-0 border-s-4"
                            type="text"
                            placeholder="..."
                        />
                    </label>
                    <label class="label">
                        <h5 class="text-sm tracking-wider">Postal Code</h5>
                        <input
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
                            class="input tracking-wider rounded-sm border-0 border-s-4"
                            type="text"
                            placeholder="..."
                        />
                    </label>
                    <label class="label">
                        <h5 class="text-sm tracking-wider">Nationality</h5>
                        <input
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
                            class="input tracking-wider rounded-sm border-0 border-s-4"
                            type="text"
                            placeholder="..."
                        />
                    </label>
                    <label class="label">
                        <h5 class="text-sm tracking-wider">Date Of Birth</h5>
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