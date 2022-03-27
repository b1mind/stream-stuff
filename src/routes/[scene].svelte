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
  import { dev } from '$app/env'
  import { onMount } from 'svelte'
  import Timer from '$lib/component/Timer.svelte'
  import { gsap } from 'gsap'

  export let params

  onMount(() => {
    const lineTopLong = document.querySelector('#lines > *:last-child')
    const lineBottomLong = document.querySelector('use > *:last-child')
    const linesTop = gsap.utils.toArray('#lines > *:not(:last-child)')
    const linesBottom = gsap.utils.toArray('use > *:not(:last-child)')
    const main = document.querySelector('main')
    gsap.from(main, {
      duration: 2.5,
      '--gradient-op': '89%',
      '--gradient-deg': '167deg',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap
      .timeline({
        repeat: -1,
        // repeatDelay: 0.5,
        defaults: {
          duration: 0.75,
          x: 150,
          opacity: 0,
          ease: 'back.in',
        },
      })

      .from(lineTopLong, { x: 300, ease: 'back' }, 0)
      .from(lineBottomLong, { x: 300, ease: 'back' }, 0)
      .from(linesTop, { stagger: 0.1 }, '>-=0.5')
      .from(linesBottom, { stagger: 0.1 }, '<')

      .to(lineTopLong, { duration: 3, x: -700, ease: 'power3.out' }, '>+=0.5')
      .to(lineBottomLong, { duration: 3, x: -700, ease: 'power3.out' }, '<')
      .to(linesTop, { x: -250, stagger: 0.1, ease: 'bounce.out' }, '>-=1.5')
      .to(linesBottom, { x: -250, stagger: 0.1, ease: 'bounce.out' }, '<')
  })
</script>

<main>
  <article>
    <svg
      class="lines-top"
      width="390"
      height="17"
      viewBox="0 0 390 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="lines">
        <path
          d="M389.526 -5.35111e-05L375.442 16.4316H330.842L344.926 -5.35111e-05H389.526Z"
          fill="#877FAB"
        />

        <path
          d="M331.022 -5.35111e-05L316.938 16.4316H272.337L286.422 -5.35111e-05H331.022Z"
          fill="#877FAB"
        />

        <path
          d="M272.297 -5.38826e-05L258.213 16.4316H213.612L227.697 -5.38826e-05H272.297Z"
          fill="#877FAB"
        />

        <path
          d="M213.612 -5.38826e-05L199.528 16.4316H154.927L169.012 -5.38826e-05H213.612Z"
          fill="#877FAB"
        />
        <path
          d="M150.233 -5.38826e-05L136.148 16.4316H3.05176e-05L14.0843 -5.38826e-05H150.233Z"
          fill="#877FAB"
        />
      </g>
    </svg>

    <h2>
      {#if params.scene === 'start'}
        Starting
      {:else}
        Ending
      {/if}
    </h2>
    <b>Soon</b>

    <svg
      class="lines-bottom"
      width="390"
      height="17"
      viewBox="0 0 390 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href="#lines" />
    </svg>
  </article>

  <svg
    id="mountains"
    viewBox="0 0 1502 379"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M292.936 202.016L0 234V379H1502V20.2016L1297.52 92.3501H1230.94L1170.23 115.438L1125.19 77.9204H1066.45L1029.24 0L995.949 20.2016H941.118L894.12 51.947H805.999L764.875 77.9204L743.335 115.438H643.464C643.464 115.438 605.824 137.484 580.799 150.069C533.615 173.798 455.471 202.016 455.471 202.016C391.997 185.153 356.409 186.707 292.936 202.016Z"
      fill="#18141F"
    />
  </svg>

  <time datetime="00:10:00">
    {#if dev}
      69:69
    {:else}
      <Timer countDown={params.scene === 'end' ? 5 : 10} />
    {/if}
  </time>
</main>

<style lang="scss">
  main {
    --gradient-op: 98%;
    --gradient-deg: 165deg;
    width: 100%;
    height: 1080px;
    display: grid;
    grid-template-areas: 'overlay';
    place-items: center;
    color: var(--clr-white);
    text-align: center;
    font-size: 10rem;
    font-family: Helvetica, sans-serif;
    // background: hsl(251, 25%, 17%);
    // background: linear-gradient(180deg, hsl(251, 25%, 17%, 1) 62%, #ff50ff);
    background: hsl(251, 25%, 17%);
    background: linear-gradient(
      var(--gradient-deg),
      hsl(251, 25%, 10%) 44%,
      hsl(251, 25%, 14%) 53%,
      hsl(300, 100%, 66%) var(--gradient-op)
    );

    & > * {
      grid-area: overlay;
    }
  }

  svg {
    overflow: visible;
  }

  #mountains {
    align-self: end;
  }

  .lines-top {
    justify-self: end;
    align-self: start;
  }

  .lines-bottom {
    transform: rotate(180deg);
  }

  time {
    place-self: end;
    padding-left: 2.25rem;
    padding-right: 2.25rem;
    color: var(--clr-primary-bg);
    font-size: 7.8125rem;
    background-color: var(--clr-highlight-text);
  }

  article {
    align-self: start;
    width: 950px;
    // height: 850px;
    margin-top: 10rem;
    display: grid;
    z-index: 69;

    h2 {
      margin: 0;
      font-size: inherit;
      place-self: start;
    }

    b {
      place-self: end;
      color: var(--clr-highlight-text);
    }
  }
</style>
