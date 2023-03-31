<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let id: string = 'inputEl',
		value: string = '',
		label: string = '',
		required: boolean = false,
		readonly: boolean = false,
		maxlength: number = 99999999,
		pattern: string | undefined = undefined,
		disabled: boolean = false;

	let inputElement: HTMLInputElement;
	let placeholder: string = 'transparent for label';

	const dispatch = createEventDispatcher();
	let original: string;

	onMount(() => {
		original = value;
	});

	function blurinput() {
		if (!inputElement.checkValidity()) {
			inputElement.reportValidity();
		}
	}
</script>

<div class="mb-8 px-10">
	<div class="relative">
		<input
			bind:this={inputElement}
			{id}
			name={id}
			type="password"
			class="input input-ghost input-sm w-full max-w-xs rounded-none peer border-0 border-b-2 border-primary placeholder-transparent
				   focus:outline-none focus:border-b-primary-focus"
			bind:value
			on:blur={blurinput}
			{placeholder}
			{required}
			{readonly}
			{maxlength}
			{pattern}
			{disabled} />
		{#if label.length > 0}
			<label
				for={id}
				class="absolute left-0 -top-3.5 text-base-content text-sm transition-all
						peer-placeholder-shown:text-base peer-placeholder-shown:text-base-content peer-placeholder-shown:top-2.5
						peer-focus:-top-3.5 peer-focus:text-base-content peer-focus:text-opacity-70 peer-focus:text-sm">
				{label}
			</label>
		{/if}
	</div>
</div>
