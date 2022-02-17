<script context="module">
  export async function load({ params }) {
    return {
      props: {
        params: params,
      },
    }
  }
</script>

<script>
  import Timer from '$lib/component/Timer.svelte'
  export let params
</script>

<main>
  <article>
    {#if params.scene === 'start'}
      <b>Starting <span>Soon</span></b>
    {:else}
      <b>Ending <span>Soon</span></b>
    {/if}

    <Timer time="5" />
  </article>

  <div class="background">
    <svg viewBox="0 0 50 50">
      <circle fill="" r="25" cy="25" cx="25" />
    </svg>
  </div>
</main>

<style lang="scss">
  main {
    height: 100%;
    display: grid;
    grid-template-areas: 'overlay';
    place-content: center;
    color: whitesmoke;
    text-align: center;
    font-size: 10rem;

    & > * {
      grid-area: overlay;
    }

    article {
      display: grid;
      place-content: center;
      opacity: 99;
      z-index: 69;
    }

    svg {
      width: 100%;
      height: 100%;
      opacity: 99;
      z-index: -69;
    }
  }

  span {
    color: var(--clr-highlight-text);
  }
</style>
