import type { GridColumnType } from './GridColumn.type';

export interface GridOptionsType<T> {
	pk: string;
	columns: Array<GridColumnType>;
	rowBackgroundColor?: (item: T) => string;
}
