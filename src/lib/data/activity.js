import { persistStore } from './persistStore'
const data = [{}]

export const activity = persistStore('activity', data)
