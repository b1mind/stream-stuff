<script>
  import { slide } from 'svelte/transition'
  import { onMount, afterUpdate } from 'svelte'

  export let time
  let countDown
  let initialTimer = 24000 * 60
  let countDownMinutes
  let countDownSeconds

  // afterUpdate(() => {
  //   startTimer(time)
  // })

  onMount(() => {
    startTimer(time)
  })

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
</script>

<b in:slide={{ y: '-1rem' }}>
  {countDownMinutes || '00'}{`:${countDownSeconds || '00'}`}
</b>

<style lang="scss">
  b {
    font-weight: 700;
    font-family: 'Space Mono', monospace;
    line-height: 1;
  }
</style>
