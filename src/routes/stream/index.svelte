<script>
  import { browser } from '$app/env'
  import { fly, slide } from 'svelte/transition'
  import Modes from '$lib/component/Modes.svelte'

  //todo handle isMode better: Maybe object for names/props?
  let isChat = true
  let isGhost = false
  let isFocus = false
  let isSub = false
  let isRaid = false

  let raid = {
    user: 'user',
    viewers: 100,
  }

  let subscriber = {
    user: 'testLongLongSubName',
    subType: 'subscribed',
    msg: '69 months - 6 month streak',
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

      raid = {
        user: user,
        viewers: viewers,
      }

      isRaid = true
    }

    ComfyJS.onSub = (user, message, subTierInfo, extra) => {
      console.dir(message)
      console.dir(user)
      console.dir(subTierInfo)
      console.dir(extra)

      subscriber = {
        user: user,
        subType: subTierInfo,
        msg: 'message',
      }

      isSub = true
    }

    ComfyJS.onCommand = (user, command, message, flags, extra) => {
      console.dir(extra)
      //todo function to check if broadcaster and mod/sub ect.

      if (command === 'sub') {
        console.log(`Faux Sub ${user}`)

        subscriber = {
          user: user,
          subType: 'subscribed',
          msg: 'subTierInfo',
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
  <div class="test-controls">
    <label for="isSub">
      SubTest
      <input bind:checked={isSub} type="checkbox" name="isSub" />
    </label>

    <label for="isRaid">
      RaidTest
      <input bind:checked={isRaid} type="checkbox" name="isRaid" />
    </label>
  </div>

  <div class="modes">
    <Modes active={isChat} modeType="chat" />
    <Modes active={isGhost} modeType="ghost" />
    <Modes active={isFocus} modeType="focus" />
  </div>

  <section class="alerts-wrap">
    {#if isSub}
      <b in:slide={{ y: '-1rem', delay: 1000 }}>{subscriber.subType}</b>
      <article in:fly={{ x: 400, duration: 550 }} class="alerts">
        <header>
          <h2>
            {subscriber.user}
          </h2>
          <i>{subscriber.msg}</i>
        </header>

        <img
          src="https://media.giphy.com/media/p7QJSVvU4bMWc/giphy.gif"
          alt="Ed & Ein Excited Thank You"
        />

        <figure>
          <img src="https://media.giphy.com/media/Y6QIbWeGMypig/giphy.gif" alt="" />
          <figcaption>Follow</figcaption>
        </figure>

        <!-- todo make a end stream scene with this -->
        <!-- <img
          src="https://media.giphy.com/media/D05oEJk20L09a/giphy.gif"
          alt="Ed riding into the sunset with pin wheel in background"
        /> -->

        <!-- todo use for raid? -->
      </article>
    {:else if isRaid}
      <b in:slide={{ y: '-1rem', delay: 1000 }}>raid</b>
      <article in:fly={{ x: 400, duration: 550 }} class="alerts">
        <header>
          <h2>{raid.user}</h2>
          <i>Raided with a party of {raid.viewers} viewers </i>
        </header>

        <img
          src="https://c.tenor.com/4g2pk3Cgf70AAAAC/mugen-pt.gif"
          alt="Mugen Hiding from Tengu into Field"
        />

        <img
          src="https://media.giphy.com/media/aZzXDWIjefE5y/giphy.gif"
          alt="Ed from Cowboy Bebop watering the garden"
        />

        <img
          src="https://media.giphy.com/media/z9pV5qD0KEca4/giphy.gif"
          alt="Fey hallucinating in the bathroom swimming with fishes"
        />
        <!-- todo make for keyboard only gif -->
        <!-- <img
          src="https://c.tenor.com/dSPOmUJ6_t4AAAAC/mugen-samurai.gif"
          alt="Mugen only needs his hands to code"
        /> -->
      </article>
    {/if}
  </section>

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
  figure,
  p {
    margin: 0;
  }

  main {
    height: 100%;
    display: grid;
    grid-template-columns: 420px 1fr 296px 153px;
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

  .alerts-wrap {
    grid-area: alerts;
    place-self: end;
    min-width: 296px;
    display: grid;
    overflow: hidden;

    b {
      justify-self: end;
      padding: 0.35rem 0.65rem;
      color: var(--clr-primary-bg);
      text-transform: uppercase;
      font-weight: 800;
      background-color: var(--clr-highlight);
      z-index: 99;
    }
  }

  .alerts {
    display: grid;
    background-color: var(--clr-primary-bg);

    header {
      // grid-area: 1/1/2/2;
      padding: 0.6rem;
      color: var(--clr-white);
      text-align: right;
      border: 9px solid var(--clr-secondary-bg);
      background-color: var(--clr-primary-bg);

      h2 {
        margin-bottom: 0.25rem;
        color: var(--clr-active);
        font-size: 1.4rem;
      }
    }

    img {
      justify-self: center;
      display: block;
      max-width: 100%;
      height: 220px;
      object-fit: cover;
      // max-width: 292px;
      // aspect-ratio: 16/9;
      border: 9px solid var(--clr-primary-bg);
    }
  }
</style>
