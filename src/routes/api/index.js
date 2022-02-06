export async function get({ params, fetch, request }) {
  //todo get response from twitch-cli server https://localhost:9000/eventSub *
  //CORs issue? 500 response?

  console.log(params)
  console.dir(fetch)
  console.dir(request)
  const data = request.json
  console.dir(data)

  console.dir(request.headers)

  return {
    body: request,
  }
}
