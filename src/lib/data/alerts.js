import { writable } from 'svelte/store'

const data = {
  active: false,
  type: 'chat',
  mode: 'chat',

  followed: {
    user: 'followedUser',
    msg: 'user msg',
    url: 'https://media.giphy.com/media/Y6QIbWeGMypig/giphy.gif',
    sound: '/sounds/alertFollow.ogg',
  },

  raid: {
    user: 'RaidUser',
    msg: `Being raided`,
    url: 'https://c.tenor.com/4g2pk3Cgf70AAAAC/mugen-pt.gif',
    sound: '/sounds/alertRaid.ogg',
  },

  bigRaid: {
    user: 'LargeRaidUser',
    msg: `Being raided big!`,
    url: 'https://c.tenor.com/-QlJHq586eUAAAAd/cowboy-bebop-faye-valentine.gif',
    sound: '/sounds/alertRaidLrg.ogg',
  },

  cheer: {
    user: 'cheerUser',
    msg: `cheered bits`,
    //todo need to change this gif to a better one
    url: 'https://media.giphy.com/media/Y6QIbWeGMypig/giphy.gif',
    sound: '/sounds/alertBits.ogg',
  },

  subscribed: {
    user: 'subUser',
    msg: 'user msg',
    url: 'https://media.giphy.com/media/p7QJSVvU4bMWc/giphy.gif',
    sound: '/sounds/alertSub3.ogg',
  },

  resubbed: {
    user: 'reSub',
    msg: 'rescubscribed for another month',
    url: 'https://c.tenor.com/DPzxgKQQqX4AAAAd/ein-jumping-cowboy-bebop-ein.gif',
    sound: '/sounds/alertSub3.ogg',
  },

  gifted: {
    user: 'GifterName',
    msg: 'Gifted User a sub',
    url: 'https://c.tenor.com/EzWoSC-xw34AAAAC/vash-thumbs-up.gif',
    sound: '/sounds/alertSub3.ogg',
  },

  gifts: {
    user: 'GifterName',
    msg: 'Gifted 5 subs',
    url: 'https://c.tenor.com/EzWoSC-xw34AAAAC/vash-thumbs-up.gif',
    sound: '/sounds/alertSub3.ogg',
  },

  chat: {
    msg: 'Just chatting! Ask me questions or help me code.',
    url: 'https://c.tenor.com/v3yWYLX8eC4AAAAC/jet-black-cowboy-bebop.gif',
  },

  ghost: {
    msg: 'Mic off cause I need to be quiet, music will be louder.',
    url: 'https://c.tenor.com/MyrFCo_WTwIAAAAd/disappear-invisible.gif',
  },

  focus: {
    msg: 'Being productive, might not respond to chat as much.',
    url: 'https://c.tenor.com/CD_F_Qh26z0AAAAC/asimov-solensan-bloody-eye.gif',
  },

  game: {
    msg: 'Game mode: Chill stream just gaming and letting my mind breath.',
    url: 'https://cdn.discordapp.com/attachments/698292729960202464/831394648186290176/boom.gif',
    // url: 'https://c.tenor.com/OWa77lYqkmoAAAAd/portal-shot-portal.gif',
  },

  //note finding another way to do this
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

  fail: {
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
