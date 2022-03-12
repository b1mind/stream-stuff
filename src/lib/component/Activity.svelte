<script>
  import { activity } from '$lib/data/activity.js'
  import { alerts } from '$lib/data/alerts.js'
  import { gsap } from 'gsap'
  import { onMount } from 'svelte'

  onMount(() => {
    const toAnimate = gsap.utils.toArray('.anime-wrapper > *')
    const tl = gsap.timeline({
      repeat: -1,
      defaults: {
        stagger: 25,
      },
    })

    //prettier-ignore
    tl
      .from(toAnimate, { autoAlpha: 0, y: '2rem'})
      .to(toAnimate, { autoAlpha: 0, y: '-2rem' }, '-=0.75')
  })
</script>

<!-- Recent Activity -->
<div class="anime-wrapper">
  <div>
    {#if $alerts.mode}
      <b>
        {$alerts.mode} mode:
      </b>
      {$alerts[$alerts.mode].msg}
    {:else}
      <b> No mode: </b>Please set a productivity mode.
    {/if}
  </div>

  <div>
    {#if $activity.length !== 0}
      <b> Recent Activity: </b>
      {#each $activity as msg}
        {msg.user}:{msg.type}, {'\n'}
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .anime-wrapper {
    display: grid;
    place-items: center;
    color: var(--clr-white);
    font-size: 1.1rem;

    & > * {
      grid-area: 1 / -1;
    }
  }

  b {
    margin: 0;
    color: var(--clr-highlight-text);
    font-size: 0.75em;
    text-transform: capitalize;
  }
</style>
