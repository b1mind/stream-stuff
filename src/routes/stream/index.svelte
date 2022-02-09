<script>
  import { browser, dev } from '$app/env'
  import { fly, slide } from 'svelte/transition'
  import Modes from '$lib/component/Modes.svelte'
  import TestController from '$lib/component/TestController.svelte'

  let alerts = {
    active: false,
    type: 'ghost',
    raid: {
      user: 'raidTestUser',
      msg: `Raiding with 100 test viewers`,
      url: 'https://c.tenor.com/4g2pk3Cgf70AAAAC/mugen-pt.gif',
    },

    sub: {
      user: 'testLongLongSubName',
      msg: '69 months - 6 month streak',
      url: 'https://media.giphy.com/media/p7QJSVvU4bMWc/giphy.gif',
      //follower gif
      // url: 'https://media.giphy.com/media/Y6QIbWeGMypig/giphy.gif',
    },

    chat: {
      msg: 'Chat mode: Let us have a chat as I try to be productive',
      url: 'https://media.giphy.com/media/p7QJSVvU4bMWc/giphy.gif',
    },

    ghost: {
      msg: 'Ghost mode: Mic off for privacy of the house, music will be louder.',
      url: 'https://media.giphy.com/media/fsoCk5kgOcYMM/giphy.gif',
    },

    focus: {
      msg: 'Focus mode: Being productive, might not respond to chat.',
      url: 'https://c.tenor.com/CD_F_Qh26z0AAAAC/asimov-solensan-bloody-eye.gif',
    },
  }

  let times = 1

  function runAlert(alertType) {
    alerts.type = alertType
    alerts.active = true

    setTimeout(function tick() {
      if (times === 0) return (alerts.active = false)
      times--
      setTimeout(tick, 10000)
    }, 100)
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

      alerts.raid.user = user
      alerts.raid.msg = `Raiding with ${viewers} viewers`
      runAlert(command)
    }

    ComfyJS.onSub = (user, message, subTierInfo, extra) => {
      console.dir(message)
      console.dir(user)
      console.dir(subTierInfo)
      console.dir(extra)

      alerts.sub.user = user
      alerts.sub.msg = message
      //not having a timer atm is kinda nice cause if it works.. it should stay
      runAlert(command)
    }

    ComfyJS.onCommand = (user, command, message, flags, extra) => {
      // console.dir(extra)

      //todo function to check if broadcaster and mod/sub ect.
      const vipList = ['broadcaster', 'moderator', 'vip']
      const cmdList = ['chat', 'ghost', 'focus', 'raid', 'sub']

      //todo refactor cleaner with switch or better function
      if (flags.broadcaster && cmdList.includes(command)) {
        runAlert(command)
      }

      if (command === 'sub') {
        console.log(`Faux Sub ${user}`)
        alerts.sub.user = user
      }
    }

    ComfyJS.Init('b1mind')
  }
</script>

<main>
  {#if dev}
    <div class="test-controls">
      <label for="alert">
        AlertTest
        <input bind:checked={alerts.active} type="checkbox" name="alert" />
      </label>
      <!-- <TestController /> -->
    </div>
  {/if}

  <div class="modes">
    <Modes active={alerts.type === 'chat'} modeType="chat" />
    <Modes active={alerts.type === 'ghost'} modeType="ghost" />
    <Modes active={alerts.type === 'focus'} modeType="focus" />
  </div>

  <section class="alerts-wrap">
    {#if alerts.active}
      <b in:slide={{ y: '-1rem', delay: 800 }}>{alerts.type}</b>

      <article in:fly={{ x: 400, duration: 550 }} class="alerts">
        <header>
          <h2>{alerts[alerts.type].user || ''}</h2>
          <i>{alerts[alerts.type].msg}</i>
        </header>

        <img src={alerts[alerts.type].url} alt="Gif for alert" />
      </article>
    {/if}
  </section>
  <p>Testing Modes</p>

  <!-- {#if isChat}
    <p in:slide>Chat Mode: Working on something and talking with chat.</p>
  {:else if isGhost}
    <p in:slide>Ghost Mode: Mic is off for family privacy but will type in chat.</p>
  {:else if isFocus}
    <p in:slide>Focus Mode: Not going to see chat as often</p>
  {:else}
    <p in:slide>No mode selected</p>
  {/if} -->

  <h1>Finally getting the hang of this</h1>
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
    align-self: start;
    padding-top: 50px;
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

  .test-controls {
    position: absolute;
    z-index: 99;
  }
</style>
