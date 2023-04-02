import { writable, get, type Subscriber, type Unsubscriber } from 'svelte/store';
import { browser } from '$app/environment';
import type { User } from 'firebase/auth';

declare type Invalidator<T> = (value?: T) => void;

interface ISUser {
	isLoggedIn: boolean;
	user?: User;
	firebaseControlled: boolean;
}

interface IAuthStore extends ISUser {
	subscribe: (this: void, run: Subscriber<ISUser>, invalidate?: Invalidator<ISUser> | undefined) => Unsubscriber;
	set: (this: void, value: ISUser) => void;
	signout: (this: void) => void;
}

function createAuthStore(initialData: ISUser): IAuthStore {
	const store = writable<ISUser>(initialData);

	return {
		subscribe: store.subscribe,
		set: function (value) {
			sessionStorage.setItem('_sv_auth', JSON.stringify(value));
			store.set(value);
		},
		signout: function () {
			sessionStorage.removeItem('_sv_auth');
			store.update((s) => ({ isLoggedIn: false, user: undefined, firebaseControlled: false } as ISUser));
		},
		isLoggedIn: get(store).isLoggedIn,
		user: get(store).user,
		firebaseControlled: get(store).firebaseControlled
	};
}

const defaultValue: ISUser = {
	isLoggedIn: false,
	firebaseControlled: false
};

const initialValue = browser
	? !sessionStorage.getItem('_sv_auth')
		? defaultValue
		: JSON.parse(sessionStorage.getItem('_sv_auth') ?? '') ?? defaultValue
	: defaultValue;

export const authStore = createAuthStore(initialValue);
