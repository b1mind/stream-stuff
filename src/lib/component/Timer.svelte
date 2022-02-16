<script>
  import { slide } from 'svelte/transition'
  import { onMount } from 'svelte'

  export let countDown
  let initialTimer = 24000 * 60
  let countDownMinutes
  let countDownSeconds

  // afterUpdate(() => {
  //   startTimer(countDown)
  // })

  onMount(() => {
    startTimer()
  })

  function startTimer() {
    // if (time) initialTimer = time * 1000 * 60
    // if (!countDown)
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
</script>

<b in:slide={{ y: '-1rem' }}>
  {countDownMinutes || '00'}{`:${countDownSeconds || '00'}`}
</b>

<style lang="scss">
  b {
    padding: 0.2rem 0.7rem;
    align-self: start;
    justify-self: end;
    color: var(--clr-primary-bg);
    font-size: 1.1rem;
    font-weight: 900;
  }
</style>
