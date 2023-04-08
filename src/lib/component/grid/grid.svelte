<script lang="ts">
	import { FieldType, type GridColumnType } from '../../../types/GridColumn.type';
	import type { GridOptionsType } from '../../../types/GridOptions.type';
	import DecimalField from '../field/decimalField.svelte';
	import NumberField from '../field/numberField.svelte';
	import TextField from '../field/textField.svelte';
	import { FormatField } from './gridUtils';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let options: GridOptionsType<any>;
	export let data: any[];
	export let draggedId: string | undefined = undefined;

	let tableRef: HTMLElement;
	let visibleColumns: GridColumnType[];

	let editing: boolean = false;
	let shiftPressed: boolean = false;
	let lastRowIndex: number = 1;
	let lastColIndex: number = 1;
	let isvalid: boolean = true;

	let prevFocusedEl: HTMLElement | null;

	function handleTableKeydown(ev: KeyboardEvent) {
		//let td = ev.target as HTMLTableCellElement;
		let td = (ev.target as HTMLElement).closest('td') as HTMLTableCellElement;
		let tr = td.closest('tr') as HTMLTableRowElement;
		let target = ev.target as HTMLElement;

		if (ev.key === 'Tab' && ev.shiftKey == false) {
			let ns = td?.nextElementSibling as HTMLTableCellElement;
			if (ns) {
				ns.focus();
				lastColIndex = lastColIndex + 1;
				ev.preventDefault();
				ev.stopImmediatePropagation();
			} else {
				let nr = tr.nextElementSibling as HTMLTableRowElement;
				(nr?.children[td.cellIndex] as HTMLTableCellElement)?.focus();

				if (nr?.rowIndex) {
					lastRowIndex = nr?.rowIndex;
					lastColIndex = 1;
					(nr.querySelector(`td:nth-child(2)`) as HTMLElement).focus();
					ev.preventDefault();
					ev.stopImmediatePropagation();
				}
			}
		} else if (ev.key === 'ArrowRight') {
			if (target.tagName === 'INPUT') {
				return;
			}

			let ns = td?.nextElementSibling as HTMLTableCellElement;

			if (ns?.cellIndex) {
				ns?.focus();
				lastColIndex = ns?.cellIndex;
			}
		} else if (ev.key === 'Tab' && ev.shiftKey == true) {
			let ps = (ev.target as HTMLElement).closest('td')?.previousElementSibling as HTMLTableCellElement;
			if (ps && lastColIndex > 1) {
				ps.focus();
				lastColIndex = lastColIndex - 1;
				ev.preventDefault();
				ev.stopImmediatePropagation();
			} else {
				let pr = tr.previousElementSibling as HTMLTableRowElement;
				(pr?.children[td.cellIndex] as HTMLTableCellElement)?.focus();

				if (pr?.rowIndex > 0) {
					lastRowIndex = pr?.rowIndex;
					lastColIndex = visibleColumns.length;
					(pr.querySelector(`td:nth-child(${visibleColumns.length + 1})`) as HTMLElement).focus();
					ev.preventDefault();
					ev.stopImmediatePropagation();
				}
			}
		} else if (ev.key === 'ArrowLeft') {
			if (target.tagName === 'INPUT') {
				return;
			}

			let ps = td?.previousElementSibling as HTMLTableCellElement;

			if (ps?.cellIndex > 0) {
				ps?.focus();
				lastColIndex = ps?.cellIndex;
			}
		} else if (ev.key === 'ArrowUp') {
			let tr = td.closest('tr') as HTMLTableRowElement;
			let pr = tr.previousElementSibling as HTMLTableRowElement;
			(pr?.children[td.cellIndex] as HTMLTableCellElement)?.focus();

			if (pr?.rowIndex > 0) {
				lastRowIndex = pr?.rowIndex;
				ev.preventDefault();
				ev.stopImmediatePropagation();
			}
		} else if (ev.key === 'ArrowDown') {
			let tr = td.closest('tr') as HTMLTableRowElement;
			let nr = tr.nextElementSibling as HTMLTableRowElement;
			(nr?.children[td.cellIndex] as HTMLTableCellElement)?.focus();

			if (nr?.rowIndex) {
				lastRowIndex = nr?.rowIndex;
				ev.preventDefault();
				ev.stopImmediatePropagation();
			}
			//console.log('lastRowIndex xx', lastRowIndex, ' ss:', td.innerHTML);
		} else if (options.editable && ev.key === 'F2') {
			editing = true;
		} else if (options.editable && ev.key === 'Enter') {
			editing = !editing;
			if (!editing) td.focus();
		} else if (options.editable && ev.key === 'Escape') {
			editing = false;
			td.focus();
		}
	}

	function handleTableMousedown(ev: MouseEvent) {
		if (!isvalid) {
			ev.preventDefault();
			ev.stopImmediatePropagation();
			return;
		}

		let relatedEl = ev.target as HTMLElement;

		if (relatedEl?.tagName === 'TD') {
			lastRowIndex = (relatedEl.closest('tr') as HTMLTableRowElement).rowIndex;
			lastColIndex = (relatedEl as HTMLTableCellElement).cellIndex;
			return;
		}
	}

	function handleTableDblclick(ev: MouseEvent) {
		if (!isvalid) {
			ev.preventDefault();
			ev.stopImmediatePropagation();
			return;
		}

		let relatedEl = ev.target as HTMLElement;

		if (options.editable && relatedEl?.tagName === 'TD') {
			lastRowIndex = (relatedEl.closest('tr') as HTMLTableRowElement).rowIndex;
			lastColIndex = (relatedEl as HTMLTableCellElement).cellIndex;
			editing = true;
			return;
		}
	}

	function handleTrackShift(ev: KeyboardEvent) {
		shiftPressed = ev.shiftKey;
	}

	function handleHInputFocus(ev: FocusEvent) {
		let relatedEl = ev.relatedTarget as HTMLElement;

		if (relatedEl?.tagName === 'TD') {
			lastRowIndex = (relatedEl.closest('tr') as HTMLTableRowElement).rowIndex;
			lastColIndex = (relatedEl as HTMLTableCellElement).cellIndex;
			prevFocusedEl?.focus();
			return;
		}

		//console.log(`ri: ${lastRowIndex} ci: ${lastColIndex}`);

		(
			tableRef
				.querySelector('tbody')
				?.querySelector(`tr:nth-child(${lastRowIndex})`)
				?.querySelector(`td:nth-child(${lastColIndex + 1})`) as HTMLElement
		).focus();

		if (!shiftPressed) {
			prevFocusedEl = relatedEl;
		}
	}

	function getDraggedBgColor(item: any): string {
		if (item[options.pk] === draggedId) {
			return 'draggedTh';
		}

		return '';
	}

	function getRowStyleForDragged(item: any): string {
		if (item[options.pk] === draggedId) {
			return 'draggedRow';
		}

		return '';
	}

	function getRowBgColor(item: any): string {
		let bgColor = options.rowBackgroundColor ? options.rowBackgroundColor(item) : '';
		bgColor = bgColor !== '' ? 'bg-[' + bgColor + ']' : '';
		console.log(bgColor);
		return bgColor;
	}

	$: visibleColumns = options.columns.filter((f) => f.visible !== false);
	// $: console.log('lastRowIndex:', lastRowIndex);
	// $: console.log('lastColIndex:', lastColIndex);

	//$: editing, dispatch('editChanged', editing);
</script>

<svelte:window on:keydown={handleTrackShift} on:keyup={handleTrackShift} />

<input type="text" class="absolute -z-10 left-[-1000px] w-1 h-1" tabindex="0" on:focus={handleHInputFocus} />

<div class="overflow-x-auto">
	<table
		bind:this={tableRef}
		class="table table-compact table-zebra w-full"
		on:keydown={handleTableKeydown}
		on:mousedown={handleTableMousedown}
		on:dblclick={handleTableDblclick}>
		<thead>
			<tr>
				<th class="!max-w-[30px]" />
				{#each visibleColumns as column}
					<th data-col-name={column.field}>{column.displayName}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as row, rowindex}
				<tr class={getRowStyleForDragged(row)}>
					<th class="px-0 mr-2 {getDraggedBgColor(row)}">{rowindex + 1}</th>
					{#each visibleColumns as column, colindex}
						<td class="py-0 {column.cssClass}" tabindex="-1">
							{#if editing && rowindex + 1 === lastRowIndex && colindex + 1 === lastColIndex}
								<span class="w-full">
									{#if column.type === FieldType.Text}
										<TextField inline={true} bind:value={row[column.field]} required={column.required} bind:isvalid />
									{:else if column.type === FieldType.Float}
										<DecimalField
											inline={true}
											bind:value={row[column.field]}
											required={column.required}
											bind:isvalid />
									{:else if column.type === FieldType.Number}
										<NumberField inline={true} bind:value={row[column.field]} required={column.required} bind:isvalid />
									{:else}
										{FormatField(row, column)}
									{/if}
								</span>
							{:else}
								{FormatField(row, column)}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th />
				{#each visibleColumns as _}
					<th />
				{/each}
			</tr>
		</tfoot>
	</table>
</div>

<style>
	td:focus {
		outline: 1px solid hsl(var(--p) / 0.9) !important;
	}

	td {
		text-overflow: ellipsis;
		padding-left: 3px;
		padding-right: 3px;
	}

	.draggedRow {
		border: 2px solid hsl(var(--p) / 0.6) !important;
	}

	.draggedTh {
		background-color: hsl(var(--p) / 0.6) !important;
	}
</style>
