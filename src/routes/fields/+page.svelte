<script>
	import DecimalField from '$lib/component/field/decimalField.svelte';
	import NumberField from '$lib/component/field/numberField.svelte';
	import TextField from '$lib/component/field/textField.svelte';
</script>

<div class="w-full grid grid-cols-1 sm:grid-cols-2">
	<TextField id="name" label="Text" />
	<NumberField id="age" label="Number" />
	<DecimalField id="price" label="Decimal" />
</div>
