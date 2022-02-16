<script context="module">
  export async function load({ params }) {
    return {
      props: {
        params: params,
      },
    }
  }
</script>

<script>
  export let params
</script>

<main>
  <h1>{params.scene}</h1>
  <!-- <b>{timer}</b> -->
</main>

<style lang="scss">
  main {
    height: 100%;
    display: grid;
    place-content: center;
    color: whitesmoke;
  }
</style>
