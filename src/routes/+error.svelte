<script lang="ts">
	import { page } from '$app/stores';

	const emojis: Record<number, string> = {
		420: '🫠',
		500: '💥'
	};
</script>

<svelte:head>
	<title>Error</title>
	<meta name="description" content="Error" />
</svelte:head>

<div class="flex flex-col items-center mx-auto mt-10">
	<h4>{$page.status} {$page.error?.message}</h4>

	<span style="font-size: 10rem">
		{emojis[$page.status] ?? emojis[500]}
	</span>
</div>
