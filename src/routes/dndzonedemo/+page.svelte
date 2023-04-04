<script lang="ts">
	/**
	 * Svelte DND Action draggable handle example
	 * https://www.npmjs.com/package/svelte-dnd-action
	 */

	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	interface ICList {
		id: number;
		text: string;
	}
	let items: ICList[] = [
		{
			id: 1,
			text: 'Item 1'
		},
		{
			id: 2,
			text: 'Item 2'
		},
		{
			id: 3,
			text: 'Item 3'
		},
		{
			id: 4,
			text: 'Item 4'
		},
		{
			id: 5,
			text: 'Item 5'
		},
		{
			id: 6,
			text: 'Item 6'
		}
	];

	const flipDurationMs = 200;
	let dragDisabled = true;

	function handleConsider(evt: CustomEvent<DndEvent<ICList>>) {
		items = evt.detail.items;
	}

	const handleFinalize = (evt: CustomEvent<DndEvent<ICList>>) => {
		items = evt.detail.items;
		// Ensure dragging is stopped on drag finish
		dragDisabled = true;
	};

	const startDrag = () => {
		dragDisabled = false;
	};
	const stopDrag = () => {
		dragDisabled = true;
	};

	$: if (items) {
		console.log(JSON.stringify(items));
	}
</script>

<section
	use:dndzone={{ items, dragDisabled, flipDurationMs }}
	on:consider={handleConsider}
	on:finalize={handleFinalize}>
	{#each items as item (item.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
			<div
				class="handle"
				on:mousedown={startDrag}
				on:touchstart={startDrag}
				on:mouseup={stopDrag}
				on:touchend={stopDrag} />
			<span>{item.text}</span>
		</div>
	{/each}
</section>

<style>
	div {
		position: relative;
		display: flex;
		align-items: center;
		height: 3rem;
		width: 10rem;
		text-align: center;
		vertical-align: middle;
		border: 1px solid black;
		margin: 0.2em;
		padding: 0.3em;
	}
	.handle {
		cursor: grab;
		position: absolute;
		right: 0;
		width: 2em;
		height: 80%;
		margin-top: auto;
		margin-bottom: auto;
		background-color: grey;
	}
</style>
