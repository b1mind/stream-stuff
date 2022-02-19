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
    <h2>
      {#if params.scene === 'start'}
        Starting
      {:else}
        Ending
      {/if}
    </h2>
    <b>Soon</b>

    <time datetime="00:05:00">
      <Timer time="5" />
    </time>
  </article>

  <div class="background">
    <svg viewBox="0 0 100 100">
      <path
        d="M24.5 0L0 21V96.6146L26.4706 71.7647L77.0588 61.7647L100 38.8235L100 0H24.5Z"
        fill="#18141F"
      />
      <path
        d="M100 44.7059L78.8235 65.8824L26.4706 80L3.31269 100H100L100 44.7059Z"
        fill="#242035"
      />
      <path
        d="M0 40L9.00001 34L10 19L27.2977 4.68484L57.2977 4.68484L62.7975 -0.315159L24.7978 -0.315308L6.59414e-05 21L0 40Z"
        fill="#514B6B"
      />
      <path
        d="M79.3892 70L100 48L100 44.5L79 65.5L74.9999 67L71.9999 71.5L79.3892 70Z"
        fill="#514B6B"
      />
    </svg>
  </div>
</main>

<style lang="scss">
  main {
    height: 100%;
    display: grid;
    grid-template-areas: 'overlay';
    place-items: center;
    color: var(--clr-white);
    text-align: center;
    font-size: 10rem;
    font-family: Helvetica, sans-serif;

    & > * {
      grid-area: overlay;
    }

    svg {
      width: 850px;
      height: 850px;
      z-index: -69;
    }
  }

  article {
    width: 850px;
    height: 850px;
    padding: 2rem;
    display: grid;
    z-index: 69;

    h2 {
      margin: 0;
      font-size: inherit;
      place-self: end;
    }

    b {
      place-self: start;
      color: var(--clr-highlight-text);
    }

    time {
      place-self: end;
    }
  }
</style>
