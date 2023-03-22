import type { DateFormats } from '$lib/utils/formatUtils';
import type { CurrencyType } from './Currency.type';
import type { NumberType } from './Number.type';

export type GridColumnType = {
	displayName: string;
	field: string;
	type?: string;
	visible?: boolean;
	dateFormat?: DateFormats;
	numberFormat?: NumberType;
	currrencyFormat?: CurrencyType;
	cssClass?: string;
};
