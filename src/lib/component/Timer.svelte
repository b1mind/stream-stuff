<script>
  import { slide } from 'svelte/transition'
  import { onMount } from 'svelte'

  export let countDown
  let initialTimer = 24000 * 60
  let countDownMinutes
  let countDownSeconds

  // afterUpdate(() => {
  //   startTimer(time)
  // })

  //need away to fire startTimer on reset (bubble function up)
  //fixme fire timer when count changes period not just onMount
  onMount(() => {
    startTimer(countDown)
  })

  function startTimer(time) {
    if (time) initialTimer = time * 1000 * 60
    countDown = initialTimer

    let interval = setInterval(function () {
      if (countDown <= 0) {
        let sound = new Audio('/sounds/alertAlarm.ogg')
        clearInterval(interval)

        return sound.play()
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
