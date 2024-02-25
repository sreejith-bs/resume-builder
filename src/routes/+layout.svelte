<script lang="ts">
	import '../app.pcss';
	import { initializeStores, Drawer } from '@skeletonlabs/skeleton';
	import type { ModalComponent } from '@skeletonlabs/skeleton';
	import { Modal } from '@skeletonlabs/skeleton';

	import ModalComponentFullScreen from '../lib/modals/ModalFullScreen.svelte';

	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		modalComponentFullScreen: { ref: ModalComponentFullScreen }
		// ...
	};

	initializeStores();
</script>

<Modal components={modalRegistry} />
<slot />
