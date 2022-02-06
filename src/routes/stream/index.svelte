<script>
  import { browser } from '$app/env'
  import { fly } from 'svelte/transition'
  import Modes from '$lib/component/Modes.svelte'

  //todo handle isMode better: Maybe object for names/props?
  let isChat = true
  let isGhost = false
  let isFocus = false
  let isSub = false
  let isRaid = false

  let raid = {
    user: 'user',
    users: 69,
  }

  let subscriber = {
    user: 'testLongLongSubName',
    subType: 'subscribed',
    subTime: '69months - 6month streak',
  }

  if (browser) {
    ;async () => {
      //!! working promise just looks unused
      const ComfyJS = await import('comfy.js/dist/comfy.min.js')
    }

    ComfyJS.onRaid = (user, viewers, extra) => {
      console.dir(viewers)
      console.dir(user)
      console.dir(extra)
    }

    ComfyJS.onSub = (user, message, subTierInfo, extra) => {
      console.dir(message)
      console.dir(user)
      console.dir(subTierInfo)
      console.dir(extra)
    }

    ComfyJS.onCommand = (user, command, message, flags, extra) => {
      console.dir(extra)
      //todo function to check if broadcaster and mod/sub ect.

      if (command === 'sub') {
        console.log(`Faux Sub ${user}`)

        subscriber = {
          user: user,
          subType: 'subscribed',
          subTime: 'subTierInfo',
        }

        isSub = true
      }

      //todo refactor cleaner with switch or better function
      if (flags.broadcaster && command === 'chat') {
        isChat = true
        isGhost = false
        isFocus = false
      } else if (flags.broadcaster && command === 'ghost') {
        isChat = false
        isGhost = true
        isFocus = false
      } else if (flags.broadcaster && command === 'focus') {
        isChat = false
        isGhost = false
        isFocus = true
      }
    }

    ComfyJS.Init('b1mind')
  }
</script>

<main>
  <div class="modes">
    <Modes active={isChat} modeType="chat" />
    <Modes active={isGhost} modeType="ghost" />
    <Modes active={isFocus} modeType="focus" />
  </div>

  <article translate={fly} class="alerts">
    {#if isSub}
      <b>{subscriber.subType}</b>
      <header>
        <h2>
          {subscriber.user}
        </h2>
        <i>{subscriber.subTime}</i>
      </header>

      <img
        src="https://c.tenor.com/4g2pk3Cgf70AAAAC/mugen-pt.gif"
        alt="Mugen Hiding from Tengu into Field"
      />
    {:else if isRaid}
      <header>
        <h2>{raid.user} - {raid.users}</h2>
      </header>

      <!-- <img
        src="https://media.giphy.com/media/D05oEJk20L09a/giphy.gif"
        alt="Ed from Cowboy Bebop watering the garden"
      /> -->
      <img
        src="https://c.tenor.com/dSPOmUJ6_t4AAAAC/mugen-samurai.gif"
        alt="Mugen only needs his hands"
      />
    {/if}
  </article>

  {#if isChat}
    <p in:fly>Chat Mode: Working on something and talking with chat.</p>
  {:else if isGhost}
    <p in:fly>Ghost Mode: Mic is off for family privacy but will type in chat.</p>
  {:else if isFocus}
    <p in:fly>Focus Mode: Not going to see chat as often</p>
  {:else}
    <p in:fly>No mode selected</p>
  {/if}

  <h1>Finally getting back into this</h1>
</main>

<style lang="scss">
  h1,
  h2,
  p {
    margin: 0;
  }

  main {
    height: 100%;
    display: grid;
    grid-template-columns: 420px 1fr 296px 154px;
    grid-template-rows: 1fr 420px 58px 92px;
    grid-template-areas:
      '. . . modes'
      '. . alerts .'
      '. . . .'
      'info msg . .';
    color: var(--clr-highlight);
    font-family: Helvetica, sans-serif;

    h1 {
      grid-area: msg;
      max-width: 50ch;
      place-self: center;
      font-size: 1.5rem;
      // text-align: center;
    }

    p {
      grid-area: info;
      padding: 1.5rem 0 1.5rem 1.75rem;
      font-size: 1.25rem;
      font-weight: 700;
    }
  }

  .modes {
    grid-area: modes;
    align-self: center;
    display: grid;
    gap: 20px;
    place-content: center;
  }

  .alerts {
    grid-area: alerts;
    place-self: end;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    overflow: hidden;

    b {
      grid-area: 1/1;
      justify-self: end;
    }

    header {
      padding: 0.65rem;
      color: var(--clr-white);
      background-color: var(--clr-secondary-bg);

      h2 {
        font-size: 1.4rem;
      }
    }

    img {
      display: block;
      max-width: 100%;
      height: 220px;
      object-fit: cover;
      // max-width: 292px;
      // aspect-ratio: 16/9;
      border: 7px solid var(--clr-primary-bg);
    }
  }
</style>
