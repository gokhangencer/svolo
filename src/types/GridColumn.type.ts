import type { DateFormats } from '$lib/utils/formatUtils';
import type { CurrencyType } from './Currency.type';
import type { NumberType } from './Number.type';

export enum FieldType {
	Number = 1,
	Text,
	Float,
	Money,
	List,
	DateTime,
	Date,
	Time
}

export type GridColumnType = {
	displayName: string;
	field: string;
	type: FieldType;
	visible?: boolean;
	dateFormat?: DateFormats;
	numberFormat?: NumberType;
	currrencyFormat?: CurrencyType;
	cssClass?: string;
	required?: boolean;
};
