<script>
	import Draggable from '$lib/component/draggable.svelte';
</script>

<svelte:head>
	<title>DnD Demo</title>
	<meta name="description" content="DnD Demo" />
</svelte:head>

<Draggable left={50} top={100}>
	<h1>Drag me</h1>
	Move me with your mouse
</Draggable>
