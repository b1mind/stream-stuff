<script>
  import Header from '$lib/component/Header.svelte'

  import './global.scss'
</script>

<main>
  <Header />
  <slot />
</main>

<style lang="scss">
  main {
    min-height: 100%;
    display: grid;
    place-content: center;
  }
</style>
