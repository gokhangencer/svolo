<script lang="ts">
	import NumberField from './numberField.svelte';

	export let id: string = 'inputEl',
		value: number | undefined = undefined,
		label: string = '',
		required = false,
		readonly = false,
		max: number = 99999999,
		min: number = 0,
		disabled: boolean = false,
		inline: boolean = false,
		isvalid: boolean = true;
</script>

<NumberField
	bind:id
	bind:value
	bind:label
	bind:required
	bind:readonly
	bind:max
	bind:min
	bind:disabled
	bind:inline
	bind:isvalid
	step="any" />
