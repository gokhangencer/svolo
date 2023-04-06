<script lang="ts">
	import Grid from '$lib/component/grid/grid.svelte';
	import { sample_data } from '$lib/samples/data';
	import { DateFormats, DefaultNumberFormat } from '$lib/utils/formatUtils';
	import { FieldType } from '../../types/GridColumn.type';
	import type { GridOptionsType } from '../../types/GridOptions.type';

	let gridOptions: GridOptionsType<any> = {
		pk: 'Id',
		columns: [
			{ displayName: 'SId', field: 'Id', type: FieldType.Number, visible: false },
			{ displayName: 'Name', field: 'Name', type: FieldType.Text, required: true },
			{ displayName: 'Job', field: 'Job', type: FieldType.Text, cssClass: 'text-right' },
			{
				displayName: 'Salary',
				field: 'Salary',
				type: FieldType.Float,
				numberFormat: DefaultNumberFormat,
				cssClass: 'text-right pr-4'
			},
			{ displayName: 'Company', field: 'Company', type: FieldType.Text },
			{ displayName: 'Country', field: 'Location', type: FieldType.Text },
			{ displayName: 'Last Login', field: 'LastLogin', type: FieldType.DateTime, dateFormat: DateFormats.DateTime },
			{ displayName: 'Fav Color', field: 'FavColor', type: FieldType.List }
		]
	};

	$: console.log('grid inline demo');
</script>

<svelte:head>
	<title>Grid Demo</title>
	<meta name="description" content="Grid Demo" />
</svelte:head>

<Grid data={sample_data} options={gridOptions} />
