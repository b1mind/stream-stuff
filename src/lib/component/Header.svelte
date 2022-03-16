<script>
  import { page } from '$app/stores'

  $: path = $page.url.pathname
</script>

<nav>
  <a href="/projects" class:active={path === '/projects'}>Projects</a>
  <a href="/contact" class:active={path === '/contact'}>Contact</a>
  <a href="/about" class:active={path === '/about'}>About</a>
</nav>

<style lang="scss">
  nav {
    max-width: max-content;
    display: grid;
    gap: 0.5rem;
  }

  a {
    color: blueviolet;
    font-size: 4rem;
    font-weight: bold;
    text-decoration: none;
    text-transform: uppercase;
    border-bottom: 4px solid transparent;

    &:hover {
      filter: invert(55%);
    }
  }

  .active {
    border-bottom: 4px solid var(--clr-white);
  }
</style>
