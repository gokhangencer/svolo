<script lang="ts">
	import DecimalField from '$lib/component/field/decimalField.svelte';
	import NumberField from '$lib/component/field/numberField.svelte';
	import PasswordField from '$lib/component/field/passwordField.svelte';
	import SelectField from '$lib/component/field/selectField.svelte';
	import TextField from '$lib/component/field/textField.svelte';
	import type { SelectOptionType } from '../../types/SelectOption.type';

	let optionList: Array<SelectOptionType> = [
		{ id: 1, text: `React?` },
		{ id: 2, text: `Svelte?` },
		{ id: 3, text: `Angular?` }
	];
</script>

<div class="w-full grid grid-cols-1 sm:grid-cols-2">
	<TextField id="name" label="Text" />
	<NumberField id="age" label="Number" />
	<DecimalField id="price" label="Decimal" />
	<SelectField id="selectfr" {optionList} label="Select Frontend" />
	<PasswordField id="password" label="Password" />
</div>
