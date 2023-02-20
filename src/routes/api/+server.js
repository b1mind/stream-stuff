import ComfyJS from 'comfy.js'

export async function GET({ params, fetch, request }) {
  //todo get response from twitch-cli mock server https://localhost:8080/eventSub *

  ComfyJS.onCommand = (user, command, message, flags, extra) => {
    if (flags.broadcaster && command === 'test') {
      console.log('!test was typed in chat')
      request = 'testing request'
    }
  }

  ComfyJS.Init('b1mind')

  return new Response(undefined)
}

export async function POST({ params, fetch, request }) {
  //CORs issue? 500 response?

  console.log(params, 'params')
  console.dir(request)
  const data = request.json
  console.dir(data)

  console.dir(request.headers)

  return new Response(undefined)
}
