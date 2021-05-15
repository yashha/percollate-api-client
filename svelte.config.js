import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter(),
  },
  preprocess: preprocess({postcss: true}),
};


export default config;