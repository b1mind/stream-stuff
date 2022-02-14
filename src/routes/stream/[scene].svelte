<script context="module">
  export async function load({ params, url }) {
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
  <b>{timer}</b>
</main>

<style lang="scss">
</style>
