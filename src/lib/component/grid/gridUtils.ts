import { formatCurrency, formatISOString, formatNumber } from '$lib/utils/formatUtils';

import type { GridColumnType } from '../../../types/GridColumn.type';

export function FormatField(row: any, column: GridColumnType): string {
	if (column.dateFormat !== undefined) {
		return formatISOString(row[column.field], column.dateFormat);
	} else if (column.numberFormat !== undefined) {
		return formatNumber(row[column.field]);
	} else if (column.currrencyFormat !== undefined) {
		return formatCurrency(row[column.field]);
	} else {
		return row[column.field];
	}
}
