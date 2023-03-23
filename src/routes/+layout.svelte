<script>
	import ConfirmModal from '$lib/component/confirmModal.svelte';
	import LoginForm from '$lib/component/loginForm.svelte';
	import favicon from '$lib/images/favicon.png';
	import './styles.css';

	let theme = 'retro',
		confirmOpenned = false,
		loginOpenned = false,
		drawerOpenned = false;
</script>

<div class="drawer" data-theme={theme}>
	<input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerOpenned} />
	<div class="drawer-content">
		<!-- Page content here -->
		<div class="navbar bg-base-100">
			<div class="navbar-start">
				<label for="my-drawer" class="btn btn-primary btn-ghost drawer-button">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-5 h-5 stroke-current"
						><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
				</label>
			</div>
			<div class="navbar-center">
				<a href="/" class="btn btn-ghost normal-case text-xl">Svolo</a>
			</div>
			<div class="navbar-end">
				<button class="btn btn-ghost btn-circle hidden sm:inline-flex">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
				</button>
				<div class="dropdown dropdown-end inline-block">
					<label for="" tabindex="-1" class="btn btn-ghost btn-circle">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"
							><path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6.966 14.615V6.04a25.131 25.131 0 0 0 11.343 2.768c6.482 0 8.575-3.308 15.799-3.308a22.973 22.973 0 0 1 6.926 1.507v7.608m0 0v11.546c0 3.375-3.916 3.646-7.494 3.646s-6.538 1.508-6.538 4.895c0 1.528 1.001 1.856 1.001 4.22S26.748 42.5 24 42.5s-4.003-1.215-4.003-3.579s1.001-2.69 1.001-4.22c0-3.387-2.96-4.894-6.538-4.894s-7.494-.27-7.494-3.646V14.615m0 0h34.068" /></svg>
					</label>
					<ul tabindex="-1" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
						<li><a href={'#'} on:click={() => (theme = 'light')}>light</a></li>
						<li><a href={'#'} on:click={() => (theme = 'dark')}>dark</a></li>
						<li><a href={'#'} on:click={() => (theme = 'retro')}>retro</a></li>
					</ul>
				</div>
				<button class="btn btn-ghost btn-circle">
					<div class="indicator">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
						<span class="badge badge-xs badge-primary indicator-item" />
					</div>
				</button>
				<button class="btn btn-square btn-ghost" on:click={() => (confirmOpenned = true)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-5 h-5 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
				</button>
				<div class="dropdown dropdown-end inline-block">
					<label for="" tabindex="-1" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full">
							<img alt="" src="https://avatars.githubusercontent.com/u/5635828?s=40&v=4" />
						</div>
					</label>
					<ul tabindex="-1" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
						<li>
							<a href={'https://github.com/gokhangencer/svolo'} target="_blank" class="justify-between">
								Profile
								<span class="badge">New</span>
							</a>
						</li>
						<li><a href={'#'}>Settings</a></li>
						<li><a href={'#'} on:click={() => (loginOpenned = true)}>Logout</a></li>
					</ul>
				</div>
			</div>
		</div>
		<slot />
		<footer class="sticky top-[100vh] footer footer-center p-5 bg-primary text-primary-content ">
			<div>
				<img src={favicon} class="w-12 h-12" alt="" />
				<p class="font-bold">
					Svolo Ltd. <br />Providing reliable tech since 1980
				</p>
				<p>Copyright © 2023 - All right reserved</p>
			</div>
			<div>
				<div class="grid grid-flow-col gap-4">
					<a href={'#'}
						><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"
							><path
								d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg
						></a>
					<a href={'#'}
						><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"
							><path
								d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg
						></a>
					<a href={'#'}
						><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"
							><path
								d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg
						></a>
				</div>
			</div>
		</footer>

		<ConfirmModal bind:isOpened={confirmOpenned} title={'Are you sure?'} message={'Have you liked?'} />
		<LoginForm bind:isOpened={loginOpenned} />
	</div>

	<div class="drawer-side">
		<label for="my-drawer" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-100 text-base-content">
			<!-- Sidebar content here -->
			<div class="flex flex-col h-[calc(100vh-50px)]">
				<div class=""><a href="/" class="btn btn-ghost normal-case text-xl w-full">Svolo</a></div>
				<div class="flex-1 overflow-auto scroll-smooth">
					<li>
						<a href="/griddemo" on:click={() => (drawerOpenned = false)}>Grid Demo </a>
					</li>
					<li>
						<a href="/fields" on:click={() => (drawerOpenned = false)}>Fields </a>
					</li>
					<li>
						<a
							href={'#'}
							on:click={() => {
								drawerOpenned = false;
								loginOpenned = true;
							}}
							>Login Form
						</a>
					</li>
					<li>
						<a
							href={'#'}
							on:click={() => {
								drawerOpenned = false;
								confirmOpenned = true;
							}}
							>Confirm Modal
						</a>
					</li>
				</div>
			</div>
		</ul>
	</div>
</div>
