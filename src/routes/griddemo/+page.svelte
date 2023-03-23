<script lang="ts">
	import Grid from '$lib/component/grid/grid.svelte';
	import { data } from '$lib/samples/data';
	import { DateFormats, DefaultNumberFormat } from '$lib/utils/formatUtils';
	import type { GridOptionsType } from '../../types/GridOptions.type';

	let gridOptions: GridOptionsType = {
		pk: 'Id',
		columns: [
			{ displayName: 'SId', field: 'Id', visible: false },
			{ displayName: 'Name', field: 'Name' },
			{ displayName: 'Job', field: 'Job', cssClass: 'text-right' },
			{ displayName: 'Salary', field: 'Salary', numberFormat: DefaultNumberFormat, cssClass: 'text-right' },
			{ displayName: 'Company', field: 'Company' },
			{ displayName: 'Country', field: 'Location' },
			{ displayName: 'Last Login', field: 'LastLogin', dateFormat: DateFormats.DateTime },
			{ displayName: 'Fav Color', field: 'FavColor', type: 'list' }
		]
	};
</script>

<svelte:head>
	<title>Grid Demo</title>
	<meta name="description" content="Grid Demo" />
</svelte:head>

<Grid {data} options={gridOptions} />
