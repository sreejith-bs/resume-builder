<script>
	import { DateInput } from 'date-picker-svelte';
    import { onMount } from 'svelte';
	export let date = new Date();

	function updateDatePickerClass() {
		// Get the input element
		let inputElement = document.getElementById('datePicker'); // Replace 'datePicker' with the actual ID of your input element

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

	onMount(updateDatePickerClass);
</script>

<DateInput
	bind:value={date}
	id="datePicker"
	class="input tracking-wider rounded-sm border-0 border-s-4"
	format="dd-MM-yyyy"
	placeholder="20-06-2023"
/>
