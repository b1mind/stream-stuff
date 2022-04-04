<script>
  export let isSub
  export let isRaid
  export let isChat
  export let isGhost
  export let isFocus
</script>

<label for="isSub">
  SubTest
  <input bind:checked={isSub} type="checkbox" name="isSub" />
</label>

<label for="isRaid">
  RaidTest
  <input bind:checked={isRaid} type="checkbox" name="isRaid" />
</label>

<label for="isChat">
  ChatTest
  <input bind:checked={isChat} type="checkbox" name="isChat" />
</label>

<label for="isGhost">
  GhostTest
  <input bind:checked={isGhost} type="checkbox" name="isGhost" />
</label>

<label for="isFocus">
  FocusTest
  <input bind:checked={isFocus} type="checkbox" name="isFocus" />
</label>

<style>
  input:checked {
    outline: 1px solid var(--clr-highlight);
  }
</style>
