<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { initializeApp } from 'firebase/app';
	import { getAuth, signInWithPopup, GoogleAuthProvider, signOut as fbsignOut } from 'firebase/auth';
	import {
		PUBLIC_APIKEY,
		PUBLIC_AUTHDOMAIN,
		PUBLIC_PROJECTID,
		PUBLIC_STORAGEBUCKET,
		PUBLIC_MESSAGINGSENDERID,
		PUBLIC_APPID,
		PUBLIC_MEASUREMENTID
	} from '$env/static/public';
	import 'firebase/auth';
	import { authStore } from '$lib/stores/authStore';
	//import { getAnalytics } from 'firebase/analytics';

	export let isOpened = false;

	const firebaseConfig = {
		apiKey: PUBLIC_APIKEY,
		authDomain: PUBLIC_AUTHDOMAIN,
		projectId: PUBLIC_PROJECTID,
		storageBucket: PUBLIC_STORAGEBUCKET,
		messagingSenderId: PUBLIC_MESSAGINGSENDERID,
		appId: PUBLIC_APPID,
		measurementId: PUBLIC_MEASUREMENTID
	};

	const dispatch = createEventDispatcher();
	const app = initializeApp(firebaseConfig);
	const auth = getAuth();
	const provider = new GoogleAuthProvider();
	onMount(() => {
		//const analytics = getAnalytics(app);
	});

	function handleLogin() {
		loginSucceeded();
	}

	function loginSucceeded() {
		isOpened = false;
		dispatch('yes', true);
	}

	async function handleGoogleLogin() {
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				const user = result.user;

				authStore.set({
					isLoggedIn: user !== null,
					user,
					firebaseControlled: true
				});

				loginSucceeded();
			})
			.catch((error) => {
				console.error(error);
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
			});
	}

	export function signOut() {
		fbsignOut(auth)
			.then(() => {
				authStore.signout();
			})
			.catch((error) => {
				console.error(error);
			});
	}
</script>

<div class="modal" class:modal-open={isOpened} id="my-modal">
	<div class="modal-box bg-transparent w-auto">
		<div class="selection:bg-rose-500 selection:text-white">
			<div class="flex justify-center items-center">
				<div class="flex-1">
					<div class="w-80 bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
						<div class="relative h-48 bg-primary rounded-bl-4xl">
							<svg class="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
								<path
									fill="#ffffff"
									fill-opacity="1"
									d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
							</svg>
						</div>
						<div class="px-10 pt-4 pb-8 bg-white rounded-tr-4xl">
							<h1 class="text-2xl font-semibold text-gray-900">Welcome back!</h1>
							<form class="mt-12" action="" method="POST" on:submit|preventDefault={() => {}}>
								<div class="relative">
									<input
										id="email"
										name="email"
										type="text"
										class="peer h-10 w-full border-b-2 border-gray-300 bg-white text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
										placeholder="demo@svolo.com" />
									<label
										for="email"
										class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
										Email address
									</label>
								</div>
								<div class="mt-10 relative">
									<input
										id="lpassword"
										type="password"
										name="password"
										class="peer h-10 w-full border-b-2 border-gray-300 bg-white text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
										placeholder="Password" />
									<label
										for="lpassword"
										class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
										>Password</label>
								</div>

								<div
									class="my-4 flex items-center before:mt-0.5 before:flex-1
											before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
									<p class="mx-4 mb-0 text-center font-normal">Or</p>
								</div>

								<div class="flex w-full">
									<button
										on:click={handleGoogleLogin}
										class="px-6 py-3 mt-4 mx-auto
											font-semibold text-gray-900 bg-white border-2 border-gray-500
											rounded-md shadow outline-none
											hover:bg-blue-50 hover:border-blue-400 focus:outline-none"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											class="inline w-4 h-4 mr-3 text-gray-900 fill-current"
											viewBox="0 0 48 48"
											width="48px"
											height="48px">
											<path
												fill="#fbc02d"
												d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
											<path
												fill="#e53935"
												d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
											<path
												fill="#4caf50"
												d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
											<path
												fill="#1565c0"
												d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
										</svg>Sign in with Google
									</button>
								</div>

								<input
									type="sumbit"
									value="Sign in"
									class="mt-20 px-4 py-2 rounded bg-primary hover:bg-secondary text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
									on:click={handleLogin} />
							</form>
							<a
								href={'#'}
								class="mt-4 block text-sm text-center font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500"
								on:click={handleLogin}>
								Forgot your password?
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
