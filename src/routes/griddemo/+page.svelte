<script>
	import Grid from '$lib/component/grid/grid.svelte';
	import { data } from '$lib/samples/data';
</script>

<svelte:head>
	<title>Grid Demo</title>
	<meta name="description" content="Grid Demo" />
</svelte:head>

<Grid {data} />
