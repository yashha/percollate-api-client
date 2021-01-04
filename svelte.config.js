const preprocess = require('svelte-preprocess');

module.exports = {
  kit: {
    adapter: '@sveltejs/adapter-node',
  },
  preprocess: preprocess({postcss: true}),
};
