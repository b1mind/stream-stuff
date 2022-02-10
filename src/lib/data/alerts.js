import { writable } from 'svelte/store'

const data = {
  active: false,
  type: 'ghost',
  mode: 'ghost',
  raid: {
    user: 'raidTestUser',
    msg: `Raiding with 420 test viewers`,
    url: 'https://c.tenor.com/4g2pk3Cgf70AAAAC/mugen-pt.gif',
  },

  sub: {
    user: 'testLongLongSubName',
    msg: '69 months - 6 month streak',
    url: 'https://media.giphy.com/media/p7QJSVvU4bMWc/giphy.gif',
    //follower gif
    // url: 'https://media.giphy.com/media/Y6QIbWeGMypig/giphy.gif',
  },

  chat: {
    msg: 'Chat mode: Just chating, ask me questions or help me code.',
    url: 'https://c.tenor.com/v3yWYLX8eC4AAAAC/jet-black-cowboy-bebop.gif',
  },

  ghost: {
    msg: 'Ghost mode: Mic off for families privacy, music will be louder.',
    url: 'https://c.tenor.com/MyrFCo_WTwIAAAAd/disappear-invisible.gif',
  },

  focus: {
    msg: 'Focus mode: Being productive, might not respond to chat as much.',
    url: 'https://c.tenor.com/CD_F_Qh26z0AAAAC/asimov-solensan-bloody-eye.gif',
  },

  game: {
    msg: 'Game mode: Chill stream just gaming and letting my mind breath.',
    url: 'https://c.tenor.com/OWa77lYqkmoAAAAd/portal-shot-portal.gif',
  },
}

export const alerts = writable(data)
