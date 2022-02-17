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
    <svg viewBox="0 0 100 100">
      <path
        d="M10 0L5.29412 4.70588L0 9.41177V96.6146L26.4706 71.7647L77.0588 61.7647L100 38.8235L100 0H10Z"
        fill="#18141F"
      />
      <path
        d="M100 44.7059L78.8235 65.8824L26.4706 80L3.31269 100H100L100 44.7059Z"
        fill="#242035"
      />
      <!-- <circle fill="#18141F" r="50" cy="50" cx="50" /> -->
    </svg>
  </div>
</main>

<style lang="scss">
  main {
    height: 100%;
    display: grid;
    grid-template-areas: 'overlay';
    place-content: center;
    color: var(--clr-white);
    text-align: center;
    font-size: 10rem;

    & > * {
      grid-area: overlay;
    }

    article {
      display: grid;
      place-content: center;
      z-index: 69;
    }

    svg {
      width: 850px;
      height: 850px;
      z-index: -69;
    }
  }

  span {
    color: var(--clr-highlight-text);
  }
</style>
