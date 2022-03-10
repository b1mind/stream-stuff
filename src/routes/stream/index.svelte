<script>
  import { browser, dev } from '$app/env'
  import { fly, slide } from 'svelte/transition'

  import { alerts } from '$lib/data/alerts'
  import { activity } from '$lib/data/activity'
  import Modes from '$lib/component/Modes.svelte'
  import Game from '$lib/component/Game.svelte'
  import Timer from '$lib/component/Timer.svelte'

  let modes = ['chat', 'ghost', 'focus']
  let alertsQue = []
  let countDown, topic

  function storeActivity(alert) {
    let { type, user } = alert
    let toStore = ['raid', 'subscribed', 'followed', 'cheer']

    if (!toStore.includes(type)) return
    $activity = [{ type, user }, ...$activity]
    console.log($activity)
  }

  //fixme store gets written excessively
  function storeAlert(alert) {
    let { type, user, msg } = alert
    $alerts.type = type

    if (modes.includes(type) || type === 'game') {
      $alerts.mode = type
      if (type !== 'focus') countDown = 0
      return
    }

    if (user) $alerts[type].user = user
    if (msg) $alerts[type].msg = msg

    //fixme sound needs to play once and not onCmd
    if ($alerts[type].sound && !$alerts.active) {
      let sound = new Audio($alerts[type].sound)
      sound.play()
    }
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
      // if (alertQue[0] === ???)
      storeAlert(alertsQue[0])
      $alerts.active = true

      if (alertCount === 0) {
        $alerts.active = false
        storeActivity(alertsQue[0])
        removeAlert(alertsQue[0])
        return
      }

      alertCount--
      setTimeout(tick, 13000)
    }, 0)
  }

  if (browser) {
    ;async () => {
      //!! working promise just looks unused
      const ComfyJS = await import('comfy.js/dist/comfy.min.js')
    }

    ComfyJS.onRaid = (user, viewers, extra) => {
      //todo user get stream title
      console.dir(user)

      //todo refactor to use the store? pass in url to storeAlert
      //better way like an array to pass url/gifs?
      if (viewers > 10) {
        $alerts['raid'].url =
          'https://c.tenor.com/-QlJHq586eUAAAAd/cowboy-bebop-faye-valentine.gif'
        $alerts['raid'].sound = '/sounds/alertRaidLrg.ogg'
      }

      let msg = `Raiding with ${viewers} viewers`
      runAlert('raid', user, msg)
    }

    ComfyJS.onCheer = (user, message, bits, flags, extra) => {
      console.dir(flags)
      let msg = `Cheered ${bits} bits!`
      runAlert('cheer', user, msg)
    }

    ComfyJS.onSub = (user, message, subTierInfo, extra) => {
      console.dir(subTierInfo)
      let msg = `Tier ${subTierInfo}`
      runAlert('subscribed', user, message || msg)
    }

    ComfyJS.onReSub = (user, streamMonths, cumulativeMonths) => {
      let msg = `${streamMonths} months on a ${cumulativeMonths} streak`
      runAlert('reSubscribed', user, msg)
    }

    ComfyJS.onSubGift = (gifterUser, streakMonths, senderCount, recipientUser) => {
      let msg = `Gifted ${recipientUser} a subscription!`
      runAlert('giftedSub', gifterUser, msg)
    }

    //todo find out what type of sub this really is
    ComfyJS.onSubMysteryGift = (gifterUser, numberOfSubs, senderCount) => {
      //sender count is a total of gifted
      let msg = `Gifted ${numberOfSubs} subscriptions!`
      runAlert('mysterygift', gifterUser, msg)
    }

    ComfyJS.onCommand = (user, command, message, flags, extra) => {
      const { broadcaster, mod, highlighted, subscriber } = flags
      const vipGroup = ['broadcaster', 'mod', 'vip']
      const vipCmdList = [...modes, 'raid', 'subscribed', 'game']

      //todo subGroup.forEach or better way to check both
      const subGroup = [...vipGroup, 'subscriber']
      //currently any one can call these alerts
      const subCmdList = ['fish', 'fail', 'nope', 'food']

      vipGroup.forEach((level) => {
        if (flags[level] && vipCmdList.includes(command)) {
          runAlert(command, user, message)
        }
      })

      if ((broadcaster || mod) && command === 'focus') {
        countDown = 20
      }

      if ((broadcaster || mod) && command === 'topic') {
        topic = message
      }

      if (subCmdList.includes(command)) {
        const lastUserCmd = extra.sinceLastCommand.user
        if (lastUserCmd !== 0 && lastUserCmd < 10000) return

        runAlert(command, user, message)
      }
    }

    //note figure out how to use this
    ComfyJS.onChat = (user, message, flags, self, extra) => {
      const { highlighted } = flags

      if (user === 'Fossabot' && message.includes('just followed')) {
        let [msgUser] = message.split(' ')
        runAlert('followed', msgUser, 'just followed the stream')
      }

      if (highlighted) {
        //needs tested still with channel points?
        runAlert('yuki', user, message)
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
    </div>
  {/if}

  <div class="modes">
    <!-- todo game mode needs improved on check fixme's -->
    {#if $alerts.mode === 'game'}
      <Game />
    {:else}
      {#each modes as mode}
        <Modes active={$alerts.mode === mode} modeType={mode} />
      {/each}

      {#if countDown}
        <div class="timer">
          <Timer {countDown} />
        </div>
      {/if}
    {/if}
  </div>

  <div class="recent-activity">
    {#if $activity.length !== 0}
      {#each $activity.slice(0, 3) as msg}
        <div>
          <h2>
            {msg.type}
          </h2>
          {msg.user}
        </div>
      {/each}
    {/if}
  </div>

  <div class="alerts-wrap">
    <!-- <audio bind:this={sound} preload="auto" src="/sounds/alertSlide.ogg" /> -->
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

        {#if $alerts[$alerts.type].url}
          <img src={$alerts[$alerts.type].url} alt="Gif for {$alerts.type}" />
        {/if}
      </article>
    {/if}
  </div>

  <p>
    {#if $alerts.mode}
      {$alerts[$alerts.mode].msg}
    {:else}
      No mode: Please set a productivity mode.
    {/if}
  </p>

  <!-- todo Text for bottom bar -->
  <h1>
    {#if topic}
      {topic}
    {:else}
      Working on making this overlay better. WIP
    {/if}
  </h1>
</main>

<!-- svelte-ignore css-unused-selector -->
<style lang="scss">
  h1,
  h2,
  p,
  ul {
    margin: 0;
  }

  main {
    height: 100%;
    display: grid;
    grid-template-columns: 420px 1fr 296px 153px;
    grid-template-rows: 1fr 420px 54px 92px;
    grid-template-areas:
      '. . . modes'
      '. . alerts activity'
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
    place-items: center;
  }

  .recent-activity {
    grid-area: activity;
    display: grid;
    grid-auto-rows: max-content;
    gap: 0.25rem;
    justify-self: center;
    color: var(--clr-white);
    font-size: 1.1rem;

    h2 {
      color: var(--clr-highlight-text);
      font-size: 0.75em;
    }
  }

  .timer {
    align-self: start;
    justify-self: end;
    padding: 0.35rem 0.5rem;
    color: var(--clr-white);
    font-size: 1.1rem;
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
      color: var(--clr-white);
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
