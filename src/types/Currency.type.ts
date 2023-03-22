import type { NumberType } from './Number.type';

export interface CurrencyType extends NumberType {
	currency: string;
}
