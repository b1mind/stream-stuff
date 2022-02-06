<script>
  import { browser } from '$app/env'
  import { fly } from 'svelte/transition'
  import Modes from '$lib/component/Modes.svelte'

  //todo handle isMode better: Maybe object for names/props?
  let isChat = true
  let isGhost = false
  let isFocus = false
  let isSub = false
  let subscriber = {
    user: 'testUser',
    subTime: 'subscribed for 69months',
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
          subTime: 'subTierInfo',
        }

        isSub = true
      }

      //todo refactor cleaner way switch or better function
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

  {#if isChat}
    <p in:fly>Chat Mode: Working on something and talking with chat.</p>
  {:else if isGhost}
    <p in:fly>Ghost Mode: Mic is off for family privacy but will type in chat.</p>
  {:else if isFocus}
    <p in:fly>Focus Mode: Not going to see chat as often</p>
  {:else}
    <p in:fly>No mode selected</p>
  {/if}

  {#if isSub}
    <h1>{subscriber.user} - {subscriber.subTime}</h1>
  {:else}
    <h1>We are cooking with Sveltekit and Twitch API now! Let's have some fun!</h1>
  {/if}
</main>

<style lang="scss">
  h1,
  p {
    margin: 0;
  }

  main {
    height: 100%;
    display: grid;
    grid-template-columns: 420px 1fr 154px;
    grid-template-rows: 450px 1fr auto;
    grid-template-areas:
      '. . .'
      '. . modes'
      'info msg .';
    color: #514b6b;
    font-family: Helvetica, sans-serif;

    h1 {
      grid-area: msg;
      margin-left: 100px;
      align-self: center;
      font-size: 1.5rem;
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
    display: grid;
    gap: 20px;
    place-content: center;
  }
</style>
