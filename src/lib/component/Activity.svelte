<script>
  import { activity } from '$lib/data/activity.js'
  import { alerts } from '$lib/data/alerts.js'
  import { gsap } from 'gsap'
  import { onMount } from 'svelte'

  onMount(() => {
    const toAnimate = gsap.utils.toArray('.anime-wrapper > *')
    console.dir(toAnimate.length)

    const tl = gsap.timeline({
      repeat: -1,
      defaults: {
        stagger: { each: 20 },
      },
    })

    //prettier-ignore
    tl
      .from(toAnimate, { autoAlpha: 0, y: '2.5rem', ease: 'bounce.out(2)', })
      .to(toAnimate, { autoAlpha: 0, y: '-2.5rem' , ease: 'bounce.in(2)'}, '-=60.75')
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

  {#each $activity as activityType}
    {#if activityType.users.length !== 0}
      <div>
        <b>Recent {activityType.type}: </b>
        {[activityType.users].toString().split(',').join(', ')}
      </div>
    {/if}
  {/each}

  <!-- <div>
    {#if $activity.length !== 0}
      <b> Recent Activity: </b>
      {#each $activity as msg}
        {msg.user}:{msg.type}, {'\n'}
      {/each}
    {/if}
  </div> -->
</div>

<style lang="scss">
  .anime-wrapper {
    display: grid;
    align-items: center;
    color: var(--clr-white);
    font-size: 1.1rem;

    & > * {
      grid-area: 1 / -1;
    }
  }

  b {
    margin: 0;
    color: var(--clr-highlight-text);
    // font-size: 0.75em;
    text-transform: capitalize;
  }
</style>
