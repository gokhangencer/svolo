<script lang="ts">
	import type { GridColumnType } from '../../../types/GridColumn.type';
	import type { GridOptionsType } from '../../../types/GridOptions.type';
	import { FormatField } from './gridUtils';

	export let options: GridOptionsType;
	export let data: any[];

	let tableRef: HTMLElement;
	let visibleColumns: GridColumnType[];
	let shiftPressed: boolean = false;
	let lastRowIndex: number = 1;
	let lastColIndex: number = 2;

	let prevFocusedEl: HTMLElement | null;

	export function handleTableKeydown(ev: KeyboardEvent) {
		let td = ev.target as HTMLTableCellElement;

		if (ev.key === 'ArrowRight') {
			(td?.nextElementSibling as HTMLElement)?.focus();
		} else if (ev.key === 'ArrowLeft') {
			(td?.previousElementSibling as HTMLElement)?.focus();
		} else if (ev.key === 'ArrowUp') {
			let tr = td.closest('tr') as HTMLTableRowElement;
			(tr.previousElementSibling?.children[td.cellIndex] as HTMLTableCellElement)?.focus();
		} else if (ev.key === 'ArrowDown') {
			let tr = td.closest('tr') as HTMLTableRowElement;
			(tr.nextElementSibling?.children[td.cellIndex] as HTMLTableCellElement)?.focus();
		} else if (ev.key === 'Tab') {
			let tr = td.closest('tr') as HTMLTableRowElement;
			lastRowIndex = tr.rowIndex;
			lastColIndex = td.cellIndex + 1;
		}
	}

	export function handleTableMousedown(ev: MouseEvent) {
		let relatedEl = ev.target as HTMLElement;

		if (relatedEl?.tagName === 'TD') {
			lastRowIndex = (relatedEl.closest('tr') as HTMLTableRowElement).rowIndex;
			lastColIndex = (relatedEl as HTMLTableCellElement).cellIndex + 1;
			return;
		}
	}

	export function handleTrackShift(ev: KeyboardEvent) {
		shiftPressed = ev.shiftKey;
	}

	export function handleHInputFocus(ev: FocusEvent) {
		let relatedEl = ev.relatedTarget as HTMLElement;

		if (relatedEl?.tagName === 'TD') {
			lastRowIndex = (relatedEl.closest('tr') as HTMLTableRowElement).rowIndex;
			lastColIndex = (relatedEl as HTMLTableCellElement).cellIndex + 1;
			prevFocusedEl?.focus();
			return;
		}

		//console.log(`ri: ${lastRowIndex} ci: ${lastColIndex}`);

		(
			tableRef
				.querySelector('tbody')
				?.querySelector(`tr:nth-child(${lastRowIndex}) td:nth-child(${lastColIndex})`) as HTMLElement
		).focus();

		if (!shiftPressed) {
			prevFocusedEl = relatedEl;
		}
	}

	$: visibleColumns = options.columns.filter((f) => f.visible !== false);
</script>

<svelte:window on:keydown={handleTrackShift} on:keyup={handleTrackShift} />

<input type="text" class="absolute -z-10 left-[-1000px] w-1 h-1" tabindex="0" on:focus={handleHInputFocus} />

<div class="overflow-x-auto">
	<table
		bind:this={tableRef}
		class="table table-compact w-full"
		on:keydown={handleTableKeydown}
		on:mousedown={handleTableMousedown}>
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
						<td class={column.cssClass} tabindex="-1">{FormatField(row, column)}</td>
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
</style>
