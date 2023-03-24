<script lang="ts">
	export let left = 30,
		top = 50;

	let moving = false;

	function start() {
		moving = true;
	}
	function stop() {
		moving = false;
	}
	function move(e: MouseEvent) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}
</script>

<svelte:window on:mouseup={stop} on:mousemove={move} />

<section
	on:mousedown={start}
	class="absolute p-2 select-none border-gray-500 border-2 cursor-move "
	style="left:{left}px; top:{top}px;">
	<slot />
</section>
