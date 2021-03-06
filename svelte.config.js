/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'
import postcssCombineMediaQuery from 'postcss-combine-media-query'

const config = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    adapter: adapter(),
  },
  files: {
    exclude: ['/twitchAbout/*.md'],
  },
  preprocess: [
    preprocess({
      postcss: { plugins: [autoprefixer(), postcssCombineMediaQuery()] },
    }),
  ],
}

export default config
