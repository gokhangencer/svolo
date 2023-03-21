<script>
	import { createEventDispatcher } from 'svelte';

	export let title = '',
		message = '',
		isOpened = false;

	const dispatch = createEventDispatcher();

	function handleYes() {
		isOpened = false;
		dispatch('result', true);
	}

	function handleNo() {
		isOpened = false;
		dispatch('result', false);
	}
</script>

<!-- The button to open modal -->
<!-- <a href="#my-modal" class="btn">open modal</a> -->
<!-- Put this part before </body> tag -->
<div class="modal" class:modal-open={isOpened} id="my-modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">{title}</h3>
		<p class="py-4">{message}</p>
		<div class="modal-action">
			<a href={'#'} class="btn" on:click={handleYes}>No</a>
			<a href={'#'} class="btn" on:click={handleYes}>Yes</a>
		</div>
	</div>
</div>
