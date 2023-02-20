<script context="module">
  export async function load({ fetch }) {
    const data = await fetch('/api/')
    console.log(data)

    return {
      data: data,
    }
  }
</script>

<script>
  export let data
</script>

{data}

<style lang="scss">
</style>
