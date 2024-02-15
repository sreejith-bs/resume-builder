<script>

	let isEditing = false;
	// let label = 'Personal Details';
	export let title;
	// export let component;

	// let dynamicId = `${component}-title`;

	function updateLabel(event) {
		title = event.target.innerText;
	}

	function saveChanges(event) {
		if (event.type === 'blur') {
			isEditing = false;
		}
	}

	function toggleEdit() {
		isEditing = true;
		// const editable = document.getElementById(`${component}-title`);
	}

	function handleLineBreaks(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			isEditing = false;
		}
	}
    // $: {
    //     console.log('title', title)
    // }
</script>

<div class="title-container">
	{#if isEditing}
		<span
			id="editable-label"
			class="h3"
			contenteditable="true"
			on:input={updateLabel}
			on:blur={saveChanges}
			on:keydown={handleLineBreaks}
		>
			{title}
		</span>
	{:else}
		<span class="h3">{title}</span>
	{/if}
	<button type="button" class="edit-btn {isEditing ? 'fade-in' : 'fade-out'}" on:click={toggleEdit}>Edit</button>
</div>

<style lang="scss">
	.title-container {
		#editable-label {
			background-color: #80c8f8;
			outline: none;
		}
		.edit-btn {
			opacity: 0;
		}
		&:hover {
			.edit-btn {
				opacity: 1;
			}
		}
	}
	.edit-btn.fade-in {
		opacity: 1;
	}
	.edit-btn.fade-in,
	.edit-btn.fade-out {
		transition: opacity 0.5s ease;
	}
</style>
