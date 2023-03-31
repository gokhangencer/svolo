<script lang="ts">
	import { FieldType, type GridColumnType } from '../../../types/GridColumn.type';
	import type { GridOptionsType } from '../../../types/GridOptions.type';
	import NumberField from '../field/numberField.svelte';
	import TextField from '../field/textField.svelte';
	import { FormatField } from './gridUtils';

	export let options: GridOptionsType;
	export let data: any[];

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
		} else if (ev.key === 'F2') {
			editing = true;
		} else if (ev.key === 'Enter') {
			editing = !editing;
			if (!editing) td.focus();
		} else if (ev.key === 'Escape') {
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
			console.log(isvalid, 'sss');
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

		if (relatedEl?.tagName === 'TD') {
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

	$: visibleColumns = options.columns.filter((f) => f.visible !== false);
	$: console.log('lastRowIndex:', lastRowIndex);
	$: console.log('lastColIndex:', lastColIndex);
</script>

<svelte:window on:keydown={handleTrackShift} on:keyup={handleTrackShift} />

<input type="text" class="absolute -z-10 left-[-1000px] w-1 h-1" tabindex="0" on:focus={handleHInputFocus} />

<div class="overflow-x-auto">
	<table
		bind:this={tableRef}
		class="table table-compact w-full"
		on:keydown={handleTableKeydown}
		on:mousedown={handleTableMousedown}
		on:dblclick={handleTableDblclick}>
		<thead>
			<tr>
				<th />
				{#each visibleColumns as column}
					<th data-col-name={column.field}>{column.displayName}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as row, rowindex}
				<tr>
					<th>{rowindex + 1}</th>
					{#each visibleColumns as column, colindex}
						<td class="p-0 {column.cssClass}" tabindex="-1">
							{#if editing && rowindex + 1 === lastRowIndex && colindex + 1 === lastColIndex}
								{#if column.type === FieldType.Text}
									<div class="w-full p-0 m-0">
										<TextField inline={true} bind:value={row[column.field]} required={column.required} bind:isvalid />
									</div>
								{:else}
									{FormatField(row, column)}
								{/if}
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
		outline: 1px solid seagreen;
	}

	td {
		text-overflow: ellipsis;
		padding-left: 3px;
		padding-right: 3px;
	}
</style>
