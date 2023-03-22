import type { CurrencyType } from '../../types/Currency.type';
import type { NumberType } from '../../types/Number.type';

export enum DateFormats {
	DateTime = 1,
	Date,
	Time
}

export function formatISOToDateTime(dateISOString: string, culture: string = 'default'): string {
	return new Intl.DateTimeFormat('default', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hourCycle: 'h23'
	}).format(new Date(dateISOString));
}

export function formatISOToDate(dateISOString: string, culture: string = 'default'): string {
	return new Intl.DateTimeFormat('default', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hourCycle: 'h23'
	}).format(new Date(dateISOString));
}

export function formatISOToTime(dateISOString: string, culture: string = 'default'): string {
	return new Intl.DateTimeFormat('default', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hourCycle: 'h23'
	}).format(new Date(dateISOString));
}

export function formatISOString(dateISOString: string, dateFormat: DateFormats, culture: string = 'default'): string {
	switch (dateFormat) {
		case DateFormats.DateTime:
			return formatISOToDateTime(dateISOString, culture);
		case DateFormats.Date:
			return formatISOToDate(dateISOString, culture);
		case DateFormats.Time:
			return formatISOToTime(dateISOString, culture);
		default:
			throw new Error('formatISOString: NotSupported DateFormat');
	}
}

export const DefaultNumberFormat: NumberType = {
	culture: 'en-us',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
};

export function formatNumber(
	num: number,
	culture: string = 'en-us',
	minimumFractionDigits = 2,
	maximumFractionDigits: number = 2
): string {
	return new Intl.NumberFormat(culture, {
		minimumFractionDigits: minimumFractionDigits,
		maximumFractionDigits: maximumFractionDigits
	}).format(num);
}

export const DefaultCurrencyFormat: CurrencyType = {
	culture: 'en-us',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
	currency: 'USD'
};

export function formatCurrency(
	num: number,
	culture: string = 'en-us',
	currency: string = 'USD',
	minimumFractionDigits: number = 2,
	maximumFractionDigits: number = 2
): string {
	return new Intl.NumberFormat(culture, {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: minimumFractionDigits,
		maximumFractionDigits: maximumFractionDigits
	}).format(num);
}
