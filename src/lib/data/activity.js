import { persistStore } from './persistStore'
const data = [
  {
    type: 'followed',
    users: ['dungeoneer3', 'dota2attitude', 'MistressStarr'],
  },
  {
    type: 'subscribed',
    users: ['BenDMyers'],
  },
  {
    type: 'raid',
    users: ['crutchcorn', 'x22 viewers'],
  },
  {
    type: 'cheer',
    users: ['ManniMoki', 'x200 bits'],
  },
]

export const activity = persistStore('recent', data)
