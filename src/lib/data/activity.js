import { writable } from 'svelte/store'
let data = []

export const activity = writable(data)
