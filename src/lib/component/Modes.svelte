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
    fill: var(--clr-secondary-alt);
  }

  .active {
    fill: var(--clr-highlight-text);
  }
</style>
