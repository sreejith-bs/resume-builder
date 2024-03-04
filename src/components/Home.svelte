<script>
	import { goto } from "$app/navigation";

	function handleClick() {
		goto('/landing-page');
	}
</script>

<div class="container flex justify-center h-screen mx-auto px-4">
	<div class="grid grid-cols-2">
		<div class="flex flex-col items-center justify-center text-center">
			<h1 class="text-3xl font-bold mb-6">Craft Your Dream Resume in Minutes</h1>
			<p class="text-gray-600 mb-8">
				Struggling to write a compelling resume? We've got you covered.
			</p>
            <!-- <a href="/landing-page/create" class="px-4 py-2 variant-filled text-white font-bold btn rounded">Start Building Now</a> -->
			<button class="px-4 py-2 variant-filled text-white font-bold btn rounded" on:click={handleClick}>Start Building Now</button>
		</div>
		<div class="flex flex-col items-center justify-center text">
            <img src="./ResumeBuilder-E-1.png" alt="image of resume building peopele" />
            <!-- <div class="background"></div> -->
			<!-- <a href="#" class="px-4 py-2 bg-blue-500 text-white font-bold rounded">Start Building Now</a> -->
		</div>
	</div>
</div>

<style>
/* .background {
    background-image: url('./resume-builder-4.png');
    background-size: contain;
    background-repeat: no-repeat;
} */
</style>
