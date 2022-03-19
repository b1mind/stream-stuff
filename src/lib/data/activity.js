import { persistStore } from './persistStore'
const data = [
  {
    type: 'followed',
    users: ['bhermans', 'BjornOveBremnes', 'mylerna', 'gedzo77'],
  },
  {
    type: 'subscribed',
    users: ['BenDMyers'],
  },
  {
    type: 'raid',
    users: ['Stoney_Eagle', 'x19 viewers'],
  },
  {
    type: 'cheer',
    users: ['ManniMoki', 'x200 bits'],
  },
]

export const activity = persistStore('activity', data)
