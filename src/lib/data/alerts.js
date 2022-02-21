import { writable } from 'svelte/store'

const data = {
  active: false,
  type: 'chat',
  mode: 'chat',

  raid: {
    user: 'raidTestUser',
    msg: `Raiding with 420 test viewers`,
    url: 'https://c.tenor.com/4g2pk3Cgf70AAAAC/mugen-pt.gif',
    // url: 'https://c.tenor.com/-QlJHq586eUAAAAd/cowboy-bebop-faye-valentine.gif'
  },

  cheer: {
    user: 'cheerUser',
    msg: `cheered with X00 bits`,
    url: 'https://media.giphy.com/media/Y6QIbWeGMypig/giphy.gif',
  },

  sub: {
    user: 'testLongLongSubName',
    msg: 'some msg user sent',
    url: 'https://media.giphy.com/media/p7QJSVvU4bMWc/giphy.gif',
    sound: '/sounds/alertSub2.ogg',
    //follower gif
    // url: 'https://media.giphy.com/media/Y6QIbWeGMypig/giphy.gif',
  },

  reSub: {
    user: 'reSub',
    msg: '69 months - 6 month streak',
    url: 'https://media.giphy.com/media/Y6QIbWeGMypig/giphy.gif',
  },

  giftSub: {
    user: 'GifterName',
    msg: 'Gifted User a sub',
    url: 'https://media.giphy.com/media/Y6QIbWeGMypig/giphy.gif',
  },

  giftMysterySub: {
    user: 'GifterName',
    msg: 'Gifted 5 subs',
    url: 'https://media.giphy.com/media/Y6QIbWeGMypig/giphy.gif',
  },

  chat: {
    msg: 'Chat mode: Just chating! Ask me questions or help me code.',
    url: 'https://c.tenor.com/v3yWYLX8eC4AAAAC/jet-black-cowboy-bebop.gif',
  },

  ghost: {
    msg: 'Ghost mode: Mic off cause I need to be quiet, music will be louder.',
    url: 'https://c.tenor.com/MyrFCo_WTwIAAAAd/disappear-invisible.gif',
  },

  focus: {
    msg: 'Focus mode: Being productive, might not respond to chat as much.',
    url: 'https://c.tenor.com/CD_F_Qh26z0AAAAC/asimov-solensan-bloody-eye.gif',
  },

  game: {
    msg: 'Game mode: Chill stream just gaming and letting my mind breath.',
    url: 'https://cdn.discordapp.com/attachments/698292729960202464/831394648186290176/boom.gif',
    // url: 'https://c.tenor.com/OWa77lYqkmoAAAAd/portal-shot-portal.gif',
  },

  yuki: {
    msg: 'Yuki says Meow',
    url: '',
  },

  samurai: {
    msg: '',
    url: '',
  },

  fish: {
    msg: "Teach a person to fish, don't just feed them.",
    url: 'https://media.giphy.com/media/BIDRtK21FsrPG/giphy.gif',
  },

  try: {
    msg: 'Try harder, think smarter',
    url: 'https://media.giphy.com/media/EC2JvlspR35q8/giphy.gif',
  },

  nope: {
    msg: 'Nope, nope, nope, nope',
    url: 'https://c.tenor.com/DPzxgKQQqX4AAAAd/ein-jumping-cowboy-bebop-ein.gif',
  },

  food: {
    msg: 'Need some more food in the belly.',
    url: 'https://media.giphy.com/media/11KzOet1ElBDz2/giphy.gif',
  },
}

export const alerts = writable(data)
