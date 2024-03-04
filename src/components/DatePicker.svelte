<script>
	import { DateInput } from 'date-picker-svelte';
	import { onMount, createEventDispatcher } from 'svelte';

	export let date;
	export let id;
	const dispatch = createEventDispatcher();

	function updateDatePickerClass() {
		// Get the input element
		let inputElement = document.getElementById(`${id}`); // Replace 'datePicker' with the actual ID of your input element

		// Remove the class
		inputElement.classList.remove('svelte-1vabmef');
		inputElement.style.background = 'none';
		inputElement.style.border = 'none';
		// inputElement.addEventListener('focus', function () {
		// 	console.log('focus')
		// 	inputElement.style.outline = 'none';
		// 	inputElement.style.border = 'none';
		// });
	}

	function handleChange(event) {
		dispatch('dateChange', event.returnValue);
	}

	function handleBlur(event) {
		console.log('event-blur', event);
		dispatch('dateOnBlur', event)
	}

	onMount(updateDatePickerClass);
</script>

<DateInput
	bind:value={date}
	{id}
	on:select={handleChange}
	on:blur={handleBlur}
	class="input rounded-sm border-0 border-s-4 tracking-wider"
	format="dd-MM-yyyy"
	placeholder="dd-mm-yyyy"
	min={new Date('01-01-1980')}
	max={new Date()}
/>
