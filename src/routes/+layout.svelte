<script lang="ts">
	import Header from './header.svelte'
	import Footer from './footer.svelte'
	import PageTransition from '$lib/components/transition.svelte'
	import '../app.css'
	import 'open-props/style'
	import 'open-props/normalize'
	import 'open-props/buttons'

	export let data
</script>

<div class="layout">
	<Header />
	<main>
		<PageTransition url={data.url}>
			<slot />
		</PageTransition>
	</main>
	<Footer />
</div>

<style>
	.layout {
		height: 100%;
		max-inline-size: 1440px;
		display: grid;
		grid-template-rows: auto 1fr auto;
		margin-inline: auto;
		padding-inline: var(--size-7);
	}

	main {
		padding-block: var(--size-9);
	}

	@media (min-width: 1440px) {
		.layout {
			padding-inline: 0;
		}
	}
</style>
