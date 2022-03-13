import { persistStore } from './persistStore'
const data = [
  {
    type: 'followed',
    users: ['devcajaye', 'x_Egoist', 'dungeoneer3'],
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

export const activity = persistStore('recentActivity', data)
