<script>
  export let active = false
  export let modeType

  let icon = `/mode.svg#${modeType}`
</script>

<svg>
  <use class:active href={icon} />
</svg>

<style lang="scss">
  svg {
    width: 69px;
    height: 69px;
    fill: #242035;
  }

  .active {
    fill: #877fab;
  }
</style>
