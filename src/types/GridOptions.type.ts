import type { GridColumnType } from './GridColumn.type';

export interface GridOptionsType<T> {
	pk: string;
	columns: Array<GridColumnType>;
	editable: boolean;
	rowBackgroundColor?: (item: T) => string;
}
