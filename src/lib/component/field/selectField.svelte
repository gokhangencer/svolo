<script lang="ts">
	import type { SelectOptionType } from '../../../types/SelectOption.type';

	export let id: string = '',
		label: string = 'Select ';
	export let optionList: Array<SelectOptionType> = [];

	export let selected: number | string = '',
		required: boolean = false;

	let selectEl: HTMLSelectElement;
</script>

<div class="mb-8 px-10">
	<div class="relative">
		<select
			bind:this={selectEl}
			{id}
			name={id}
			class="select select-ghost select-sm w-full text-base-content peer max-w-xs rounded-none border-0 border-b-2 border-primary
                    focus:outline-none focus:border-b-primary-focus"
			class:notselected={selected === 0 || selected === '' || selected === undefined}
			bind:value={selected}
			{required}>
			<option value="" selected />
			{#each optionList as optionItem}
				<option value={optionItem.id}>
					{optionItem.text}
				</option>
			{/each}
		</select>
		{#if label.length > 0}
			<label
				for={id}
				class="absolute left-0 -top-3.5 text-base-content text-sm transition-all
                peer-focus:-top-3.5 peer-focus:text-base-content peer-focus:text-opacity-70 peer-focus:text-sm
                peer-valid:-top-3.5 peer-valid:text-base-content peer-valid:text-opacity-70 peer-valid:text-sm
                peer-invalid:top-3 peer-invalid:text-base-content peer-invalid:text-opacity-70 peer-invalid:text-sm
                ">
				{label}
			</label>
		{/if}
	</div>
</div>

<style>
	select.notselected:active ~ label,
	select.notselected:focus ~ label,
	select.notselected ~ label {
		top: 0.75rem !important;
		color: hsl(var(--bc) / var(--tw-text-opacity));
		--tw-text-opacity: 0.7;
		font-size: 0.875rem;
		line-height: 1.25rem;
		pointer-events: none;
	}
</style>
