import { persistStore } from './persistStore'
const data = [
  {
    type: 'followed',
    users: ['rogueyohsi', ' ReubenManezes', ' crutchcorn'],
  },
  {
    type: 'subscribed',
    users: ['BenDMyers'],
  },
  {
    type: 'raid',
    users: [],
  },
  {
    type: 'cheer',
    users: ['ManniMoki'],
  },
]

export const activity = persistStore('activity', data)
