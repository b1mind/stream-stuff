<script>
  import { browser, dev } from '$app/env'
  import { fly, slide } from 'svelte/transition'

  import { alerts } from '$lib/data/alerts'
  import { activity } from '$lib/data/activity'

  import Modes from '$lib/component/Modes.svelte'
  import Game from '$lib/component/Game.svelte'
  import Timer from '$lib/component/Timer.svelte'
  import Activity from '$lib/component/Activity.svelte'

  let modes = ['chat', 'ghost', 'focus']
  let alertsQue = []
  let countDown, topic
  let massGifter = ''

  function storeActivity(alert) {
    let { type, user, msg, extra } = alert
    let toStore = ['followed', 'subscribed', 'raid', 'cheer']

    if (!toStore.includes(type)) return

    //this hard coded value works....
    //todo refactor this ugly shit (toStore.forEach()??)
    //todo add gifter to activity
    if (type === 'followed') {
      return ($activity[0].users = [user, ...$activity[0].users.slice(0, 3)])
    } else if (type === 'subscribed' || type === 'resubbed') {
      return ($activity[1].users = [user, ...$activity[1].users.slice(0, 3)])
    } else if (type === 'raid' || type === 'bigRaid') {
      return ($activity[2].users = [user, `x${extra || ''} viewers`])
    } else if (type === 'cheer') {
      return ($activity[3].users = [user, `x${extra || ''} bits`])
    }
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

    //move to this code or keep with defaults from store
    // user ? $alerts[type].user : ''
    // msg ? $alerts[type].msg : ''
    if (user) $alerts[type].user = user
    if (msg) $alerts[type].msg = msg

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

  function runAlert(type, user, msg, extra) {
    let currentAlert = { type: type, user: user, msg: msg, extra: extra }
    alertsQue = [...alertsQue, currentAlert]

    let alertCount = alertsQue.length
    setTimeout(function tick() {
      //fixme func callBack storesAlert more than once to store

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
      //fixme having to import in script tag in app.html?!?! better way?
      const ComfyJS = await import('comfy.js/dist/comfy.min.js')
    }

    ComfyJS.onRaid = (user, viewers, extra) => {
      //todo user get stream title
      console.dir(user)
      let msg = `Raiding with ${viewers} viewers`

      if (viewers > 30) {
        runAlert('bigRaid', user, msg, viewers)
        return
      }

      runAlert('raid', user, msg, viewers)
    }

    ComfyJS.onCheer = (user, message, bits, flags, extra) => {
      let msg = `Cheered ${bits} bits!`
      runAlert('cheer', user, msg, bits)
    }

    ComfyJS.onSub = (user, message, subTierInfo, extra) => {
      console.dir(subTierInfo)

      let msg = isNaN(subTierInfo.plan)
        ? `Subscribed with Prime`
        : `Subscribed Tier ${subTierInfo.plan / 1000}`
      runAlert('subscribed', user, message || msg)
    }

    ComfyJS.onResub = (user, message, streamMonths, cumulativeMonths) => {
      let msg = `${streamMonths} months on a ${cumulativeMonths} month streak`
      runAlert('resubbed', user, message || msg)
    }

    ComfyJS.onSubGift = (gifterUser, streakMonths, recipientUser, senderCount) => {
      //testFix to handle gif and random gift (mystery)
      //https://github.com/SomeAnticsDev/scenes/blob/main/_includes/scripts/chat.html#L144-L187

      //prevent gifted sub loop for 1 > subs : credit BenDMyers
      if (gifterUser !== massGifter) {
        console.log(massGifter, gifterUser)
        let msg = `Gifted ${recipientUser} a subscription!`
        runAlert('gifted', gifterUser, msg)
      }
    }

    ComfyJS.onSubMysteryGift = (gifterUser, numberOfSubs, senderCount) => {
      //sender count is a total of

      //if only one sub let onSubGift handle
      if (numberOfSubs > 1) {
        massGifter = gifterUser
        setTimeout(() => {
          if (massGifter === gifterUser) {
            massGifter = ''
          }
        }, 500)

        let msg = `Gifted ${numberOfSubs} subscriptions!`
        runAlert('gifts', gifterUser, msg)
      }
    }

    ComfyJS.onCommand = (user, command, message, flags, extra) => {
      const { broadcaster, mod } = flags
      const vipGroup = ['broadcaster', 'mod', 'vip']
      const vipCmdList = [...modes, 'game']

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
        countDown = 25
      }

      if ((broadcaster || mod) && command === 'topic') {
        topic = message
      }

      //todo test timout and add subCmdList check
      if (subCmdList.includes(command)) {
        const lastUserCmd = extra.sinceLastCommand.user
        if (lastUserCmd !== 0 && lastUserCmd < 10000) return

        runAlert(command, (user = ''), message)
      }
    }

    ComfyJS.onChat = (user, message, flags, self, extra) => {
      const { highlighted } = flags
      // console.dir(extra)

      if (user === 'Fossabot' && message.includes('just followed')) {
        let [msgUser] = message.split(' ')
        runAlert('followed', msgUser, 'just followed the stream')
      }

      if (highlighted) {
        //todo figure out how to do the chat bubble vs run alert
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
          <svg viewBox="0 7 296 231" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g mask="url(#maskMe)">
              <image
                preserveAspectRatio="xMidYMid slice"
                y="13"
                href={$alerts[$alerts.type].url}
                alt="Gif for {$alerts.type}"
              />
            </g>

            <path
              d="M3 7.12019V3.5L293 3.50002V35.8202L274.356 21.1428L273.539 20.5H272.5H18.6098L3 7.12019Z"
              fill="#18141F"
              stroke="#403960"
              stroke-width="6"
            />

            <mask id="maskMe">
              <path
                d="M23.4689 231L6 209.236V13.5L18 23.5H272.5L288 35.5V231H23.4689Z"
                fill="white"
              />
            </mask>
          </svg>
        {/if}
      </article>
    {/if}
  </div>

  <div class="info">
    <Activity />
  </div>

  {#if topic}
    <h1>
      {topic}
    </h1>
  {/if}
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
    height: 1070px;
    display: grid;
    grid-template-columns: 420px 1fr 296px 153px;
    grid-template-rows: 1fr 1fr 420px 54px 92px;
    grid-template-areas:
      '. . . modes'
      '. . . activity'
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
  }

  .test-controls {
    position: absolute;
    z-index: 99;
  }

  .modes {
    grid-area: modes;
    align-self: start;
    padding-top: 50px;
    display: grid;
    gap: 20px;
    place-items: center;
  }

  .timer {
    align-self: start;
    justify-self: end;
    padding: 0.35rem 0.5rem;
    color: var(--clr-primary-bg);
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
      color: var(--clr-primary-bg);
      text-transform: uppercase;
      font-weight: 800;
      background-color: var(--clr-highlight-text);
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
      border: 6px solid var(--clr-highlight-text);
      border-bottom: none;
      background-color: var(--clr-primary-bg);

      h2 {
        margin-bottom: 0.25rem;
        color: var(--clr-active);
        font-size: 1.4rem;
      }
    }

    svg {
      justify-self: center;
      width: 100%;
    }

    image {
      width: 100%;
      height: 265px;
    }
  }

  .info {
    grid-area: info;
    padding: 1.5rem 0 1.5rem 1.75rem;
    font-size: 1.25rem;
    font-weight: 700;
    overflow: hidden;
  }
</style>
