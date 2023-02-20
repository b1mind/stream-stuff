export async function load({ fetch }) {
  const data = await fetch('/api/')
  console.log(data)

  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
  return {
    data: data,
  }
}
