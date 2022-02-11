<script>
  import { browser, dev } from '$app/env'
  import { fly, slide } from 'svelte/transition'
  import { alerts } from '$lib/data/alerts'
  import Modes from '$lib/component/Modes.svelte'
  // import TestController from '$lib/component/TestController.svelte'

  let modes = ['chat', 'ghost', 'focus', 'game']
  let alertsQue = []
  let initialTimer = 24000 * 60
  let countDown
  let countDownMinutes
  let countDownSeconds

  function storeAlert(alert) {
    let { type, user, msg } = alert
    $alerts.type = type

    if (modes.includes(type)) {
      $alerts.mode = type
      return
    }

    if (user) $alerts[type].user = user
    if (msg) $alerts[type].msg = msg
  }

  function removeAlert(alert) {
    alertsQue = alertsQue.filter((a) => {
      return a !== alert
    })
  }

  function runAlert(type, user, msg) {
    let currentAlert = { type: type, user: user, msg: msg }
    alertsQue = [...alertsQue, currentAlert]

    let alertCount = alertsQue.length
    setTimeout(function tick() {
      storeAlert(alertsQue[0])
      $alerts.active = true

      if (alertCount === 0) {
        $alerts.active = false
        removeAlert(alertsQue[0])
        return
      }

      alertCount--
      setTimeout(tick, 13000)
    }, 0)
  }

  function startTimer(time) {
    if (time) initialTimer = time * 1000 * 60
    countDown = initialTimer

    let interval = setInterval(function () {
      if (countDown <= 0) {
        clearInterval(interval)
      } else {
        countDown -= 1000
        countDownMinutes = padInt(parseInt(countDown / 1000 / 60))
        countDownSeconds = padInt(parseInt((countDown / 1000) % 60))
      }
    }, 1000)
  }

  function padInt(int) {
    return int > 9 ? int : '0' + int
  }

  if (browser) {
    ;async () => {
      //!! working promise just looks unused
      const ComfyJS = await import('comfy.js/dist/comfy.min.js')
    }

    ComfyJS.onRaid = (user, viewers, extra) => {
      console.dir(extra)

      let msg = `Raiding with ${viewers} viewers`
      runAlert('raid', user, msg)
    }

    ComfyJS.onSub = (user, message, subTierInfo, extra) => {
      console.dir(message)
      console.dir(subTierInfo)
      console.dir(extra)

      runAlert('sub', user, message || subTierInfo)
    }

    ComfyJS.onCommand = (user, command, message, flags, extra) => {
      // console.dir(extra)

      //todo function to check if broadcaster and mod/sub ect.
      const vipList = ['broadcaster', 'moderator', 'vip']
      const cmdList = [...modes, 'raid', 'sub']

      if (flags.broadcaster && cmdList.includes(command)) {
        runAlert(command, user, message)
      }

      if (flags.broadcaster && command === 'focus') {
        startTimer(20)
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
        <input bind:checked={$alerts.active} type="checkbox" name="alert" />
      </label>
      <!-- <TestController /> -->
    </div>
  {/if}

  <div class="modes">
    {#each modes as mode}
      <Modes active={$alerts.mode === mode} modeType={mode} />
    {/each}
  </div>

  <section class="alerts-wrap">
    <!-- {#if alertsQue.length > 0} -->

    {#if $alerts.active}
      <b in:slide={{ y: '-1rem', delay: 800 }} out:slide={{ y: '1rem', duration: 550 }}>
        {$alerts.type}
      </b>

      <article
        in:fly={{ x: 400, duration: 550 }}
        out:slide={{ y: '1rem', delay: 350 }}
        class="alerts"
      >
        <header>
          <h2>{$alerts[$alerts.type].user || ''}</h2>
          <i>{$alerts[$alerts.type].msg}</i>
        </header>

        <img src={$alerts[$alerts.type].url} alt="Gif for {$alerts.type}" />
      </article>
    {/if}
  </section>

  {#if $alerts.mode}
    <p>
      {$alerts[$alerts.mode].msg}
      {#if countDown}
        <b>{countDownMinutes || ''}{`:${countDownSeconds}` || ''}</b>
      {/if}
    </p>
  {:else}
    <p>No mode: Please set a productivity mode.</p>
  {/if}

  <h1>Working on making this overlay better. WIP</h1>
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
    grid-template-rows: 1fr 420px 54px 92px;
    grid-template-areas:
      '. . . modes'
      '. . alerts .'
      '. . . .'
      'info msg . .';
    color: var(--clr-highlight-text);
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
