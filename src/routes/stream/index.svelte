<script>
  import Modes from '../../component/Modes.svelte'
</script>

<main>
  <div class="modes"><Modes /></div>
  <p>Focus Mode: !focus for more. Not going to see chat as often</p>
  <!-- <p>Ninja mode active: I have to be silent (mute) or die. !ninja for more.</p> -->
  <h1>Learning OBS overlays</h1>
</main>

<style lang="scss">
  h1,
  p {
    margin: 0;
  }

  main {
    height: 100%;
    display: grid;
    grid-template-columns: 420px 1fr 160px;
    grid-template-rows: 450px 1fr auto;
    grid-template-areas:
      '. . .'
      '. . modes'
      'info msg .';
    color: whitesmoke;
    font-family: Helvetica, sans-serif;

    h1 {
      grid-area: msg;
      margin-left: 100px;
      align-self: center;
      font-size: 1.75rem;
    }

    p {
      grid-area: info;
      padding: 1.5rem 0 1.5rem 1.75rem;
      font-size: 1.25rem;
    }
  }

  .modes {
    grid-area: modes;
    justify-self: center;
  }
</style>
