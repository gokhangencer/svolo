<script lang="ts">
	import type { GridColumnType } from '../../../types/GridColumn.type';
	import type { GridOptionsType } from '../../../types/GridOptions.type';
	import { DateFormats, DefaultNumberFormat } from '../../utils/formatUtils';
	import { FormatField } from './gridUtils';

	export let options: GridOptionsType = {
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

	export let data: any[];

	let visibleColumns: GridColumnType[];

	$: visibleColumns = options.columns.filter((f) => f.visible !== false);
</script>

<div class="overflow-x-auto">
	<table class="table table-compact w-full">
		<thead>
			<tr>
				<th />
				{#each visibleColumns as column}
					<th>{column.displayName}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as row, rowindex}
				<tr>
					<th>{rowindex + 1}</th>
					{#each visibleColumns as column}
						<td class={column.cssClass}>{FormatField(row, column)}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				{#each visibleColumns as _}
					<th />
				{/each}
			</tr>
		</tfoot>
	</table>
</div>
