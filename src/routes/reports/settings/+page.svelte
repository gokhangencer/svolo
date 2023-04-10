<script lang="ts">
	import Grid from '$lib/component/grid/grid.svelte';
	import { DefaultNumberFormat } from '$lib/utils/formatUtils';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { v4 as uuidv4 } from 'uuid';
	import { FieldType } from '../../../types/GridColumn.type';
	import type { GridOptionsType } from '../../../types/GridOptions.type';
	import { browser } from '$app/environment';

	interface ICList {
		id: string;
		testName: string;
		result: number;
		unit: string;
		refs: string;
	}

	let items: ICList[] = [
		{ id: uuidv4(), testName: 'Großes Blutbild i. EDTA-Blut', result: 0, unit: '', refs: '' },
		{ id: uuidv4(), testName: 'Leukozyten', result: 6.2, unit: '1000/µl', refs: '3.9 - 10.2' },
		{ id: uuidv4(), testName: 'Erythrozyten', result: 4.66, unit: 'Mill/µl', refs: '3.90 - 5.15' },
		{ id: uuidv4(), testName: 'Hämoglobin', result: 13.1, unit: 'g/dl', refs: '12.0 - 15.4' },
		{ id: uuidv4(), testName: 'Hämatokrit', result: 39.6, unit: '%', refs: '35.5 - 45.0' },
		{ id: uuidv4(), testName: 'MCV (Hk/Ery-Zahl)', result: 85.0, unit: 'fl', refs: '80 - 99' },
		{ id: uuidv4(), testName: 'MCH (Hb/Ery-Zahl)', result: 28.1, unit: 'pg', refs: '27.0 - 33.5' },
		{ id: uuidv4(), testName: 'MCHC (Hb/Hk)', result: 33.1, unit: 'g/dl', refs: '31.5 - 36.0' },
		{ id: uuidv4(), testName: 'Thrombozyten', result: 236, unit: '1000/µl', refs: '150 - 370' },
		{ id: uuidv4(), testName: 'RDW-CV: Ery-Volumenverteilungsbr.', result: 14.3, unit: '%', refs: ' 9.0 - 17.0' },
		{ id: uuidv4(), testName: '  Differentialblutbild (automat.)', result: 0, unit: '', refs: '' },
		{ id: uuidv4(), testName: 'Neutrophile Granulozyten', result: 49.2, unit: '%', refs: '42.0 - 77.0' },
		{ id: uuidv4(), testName: 'Lymphozyten', result: 41.1, unit: '%', refs: '20.0 - 44.0' },
		{ id: uuidv4(), testName: 'Monozyten', result: 7.6, unit: '%', refs: '2.0 - 9.5' },
		{ id: uuidv4(), testName: 'Eosinophile Granulozyten', result: 1.5, unit: '%', refs: '0.5 - 5.5' },
		{ id: uuidv4(), testName: 'Basophile Granulozyten', result: 0.6, unit: '%', refs: '< 1.8' },
		{ id: uuidv4(), testName: 'unreife Granulozyten', result: 0.3, unit: '%', refs: '< 0.6' },
		{ id: uuidv4(), testName: '  Differentialblutbild (absolut)', result: 0, unit: '', refs: '' },
		{ id: uuidv4(), testName: 'Neutrophile Granulozyten', result: 3.03, unit: '1000/µl', refs: '1.50 - 7.70' },
		{ id: uuidv4(), testName: 'Lymphozyten', result: 2.53, unit: '1000/µl', refs: '1.10 - 4.50' },
		{ id: uuidv4(), testName: 'Monozyten', result: 0.47, unit: '1000/µl', refs: '0.10 - 0.90' },
		{ id: uuidv4(), testName: 'Eosinophile Granulozyten', result: 0.09, unit: '1000/µl', refs: '0.02 - 0.50' },
		{ id: uuidv4(), testName: 'Basophile Granulozyten', result: 0.04, unit: '1000/µl', refs: '< 0.20' },
		{ id: uuidv4(), testName: 'unreife Granulozyten', result: 0.02, unit: '1000/µl', refs: '< 0.06' },
		{ id: uuidv4(), testName: 'Blutsenkungsgeschwindigkeit (1.Std.)', result: 11, unit: 'mm', refs: '< 20' }
	];

	items = browser
		? !localStorage.getItem('_sv_zitems')
			? items
			: JSON.parse(localStorage.getItem('_sv_zitems') ?? '') ?? items
		: items;

	let gridOptions: GridOptionsType<ICList> = {
		pk: 'id',
		columns: [
			{ displayName: 'SId', field: 'id', type: FieldType.Number, visible: false },
			{
				displayName: 'Test Name',
				field: 'testName',
				type: FieldType.Text,
				required: true,
				cssClass: '!max-w-[200px]'
			},
			{
				displayName: 'Result',
				field: 'result',
				type: FieldType.Float,
				numberFormat: DefaultNumberFormat,
				cssClass: 'text-right !pr-4',
				visible: false
			},
			{ displayName: 'Unit', field: 'unit', type: FieldType.Text },
			{ displayName: 'refs', field: 'refs', type: FieldType.Text }
		],
		editable: true,
		rowBackgroundColor: (item: ICList) => {
			return item.id === draggedId ? 'red' : '';
		}
	};

	const flipDurationMs = 200;
	let dragDisabled = true;
	let draggedId = '';

	function handleConsider(evt: CustomEvent<DndEvent<ICList>>) {
		items = evt.detail.items;

		if (draggedId !== evt.detail.info.id) {
			draggedId = evt.detail.info.id;
		}
	}

	const handleFinalize = (evt: CustomEvent<DndEvent<ICList>>) => {
		items = evt.detail.items;
		// Ensure dragging is stopped on drag finish
		dragDisabled = true;

		draggedId = '';
		localStorage.setItem('_sv_zitems', JSON.stringify(items));
	};

	const startDrag = () => {
		dragDisabled = false;
	};
	const stopDrag = () => {
		dragDisabled = true;
	};

	function handleEditChange(ev: CustomEvent<any>) {
		if ((ev.detail as boolean) === false) {
			localStorage.setItem('_sv_zitems', JSON.stringify(items));
		}
	}

	let wnd: Window | null;

	async function handlePreview() {
		type IDetail = {
			FileName: string;
			DataSourceAsJson: string;
			ForceDownload: boolean;
		};

		var details: IDetail = {
			FileName: 'ztest',
			DataSourceAsJson: JSON.stringify({ lines: items }),
			ForceDownload: false
		};

		wnd?.close();

		wnd = window.open('', 'wnd');

		let reportData = encodeURIComponent(JSON.stringify(details));

		var formHtml = `<form action="https://stranom.com/api/report/GeneratePDFUE" method="post">
                            <input type="hidden" name="reportRequestObj" value="${reportData}">
                        </form>`;

		var elbody = wnd?.document.body;
		if (elbody) {
			elbody.innerHTML = formHtml;
		}

		wnd?.document.querySelector('form')?.submit();
	}

	// $: if (items) {
	// 	console.log(JSON.stringify(items));
	// }
</script>

<svelte:head>
	<title>Report Settings</title>
	<meta name="description" content="Report Settings" />
</svelte:head>

<div class="flex justify-center p-2">
	<button class="btn btn-outline btn-wide btn-info" on:click={handlePreview}>
		Preview
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M9 13a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3a3 3 0 0 0-3 3m11 6.59V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.76.83-2.76.83a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5c0 1-.31 1.96-.83 2.75L20 19.59Z" />
		</svg>
	</button>
</div>

<div class="flex">
	<div
		class="w-[50px] pt-[35px]"
		use:dndzone={{ items, dragDisabled, flipDurationMs }}
		on:consider={handleConsider}
		on:finalize={handleFinalize}>
		{#each items as item (item.id)}
			<div class="items" animate:flip={{ duration: flipDurationMs }}>
				<div
					class="handle"
					on:mousedown={startDrag}
					on:touchstart={startDrag}
					on:mouseup={stopDrag}
					on:touchend={stopDrag} />
				<!-- <span>{item.testName}</span> -->
			</div>
		{/each}
	</div>
	<div class="flex-1">
		<Grid data={items} options={gridOptions} {draggedId} on:editChanged={handleEditChange} />
	</div>
</div>

<style>
	div.items {
		position: relative;
		display: flex;
		align-items: center;
		height: 35px;
		width: 45px;
		text-align: center;
		vertical-align: middle;
		border: 1px solid hsl(var(--b1));
		margin: 1px;
	}
	.handle {
		cursor: grab;
		position: absolute;
		height: 100%;
		width: 100%;
		margin: 0;
		background-color: hsl(var(--p) / 0.6);
	}
</style>
