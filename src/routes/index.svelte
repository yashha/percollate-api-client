<svelte:head>
	<title>Percollate API</title>
</svelte:head>

<style type="text/scss">
  .paclient {
    &__iframe {
      position: absolute;
      height: 0;
      &.loaded {
        position: relative;
        width: 100%;
        height: 600px;
      }
    }
  }
</style>

<script>
  let url = "";
  let orientation = "";
  let format = "";
  let customCss = "";
  let pagesPerSide = "";
  $: isLoaded = false;

  $: {
    url = url + "";
    isLoaded = false;
  }

  $: computed_url = "https://percollate-api.herokuapp.com/pdf?url=" + url
    + `&pagesperside=${pagesPerSide}`
    + "&" + "css="
    + encodeURIComponent(`@page { size: ${format} ${orientation} }`)
    + encodeURIComponent(customCss);

  async function iframeLoaded() {
    isLoaded = true;
    console.log('test');
  }
  function onSubmit(e) {
    e.preventDefault();
  }
</script>

<div class="container w-full md:max-w-3xl mx-auto pt-20">

  <div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal" style="font-family:Georgia,serif;">
    <div class="font-sans">
      <h1 class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">Percollate API</h1>
    </div>
    <p class="py-6">
      👋 Welcome to <a class="text-teal-500 no-underline hover:underline" href="https://github.com/yashha/percollate-api">Percollate API</a> a Public API to transform website content to pdf using the percollate package.
    </p>

    <form class="w-full" on:submit="{onSubmit}">
      <label>
        <input
          class="bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          name="url" placeholder="Enter url"
          bind:value={url}>
      </label>

      <br>

      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            FORMAT
          </label>
          <div class="relative">
            <select bind:value="{format}" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option value="a4">A4</option>
              <option value="a5" selected>A5</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            ORIENTATION
          </label>
          <div class="relative">
            <select bind:value="{orientation}" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option value="portrait" selected>portrait</option>
              <option value="landscape">landscape</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            PAGES PER SIDE
          </label>
          <div class="relative">
            <select bind:value="{pagesPerSide}" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option value="1" selected>1</option>
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
          <details>
            <summary>Custom CSS</summary>
            <label class="block uppercase tracking-wide text-gray-700  mt-3 text-xs font-bold mb-2" for="grid-state">
              CUSTOM CSS
            </label>
            <div class="relative">
              <textarea bind:value={customCss} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"></textarea>
            </div>
          </details>
        </div>
      </div>
    </form>

    <br>

    <div class="block w-full">
      {#if url}
        <iframe class="paclient__iframe {isLoaded && url ? 'loaded': ''}" src="{computed_url}" title="test" on:load="{iframeLoaded}"></iframe>
      {/if}
      {#if !isLoaded && url}
        Loading ... this could take up to 30s
      {/if}
    </div>

    <br>

    <hr class="border-b-2 border-gray-400 mb-4 mx-4">
    <div class="flex w-full items-center font-sans px-4 py-12">
      <img class="w-10 h-10 rounded-full mr-4" src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.9.0/svgs/brands/github.svg" alt="Github">
      <div class="flex-1 px-2">
        <p class="text-base font-bold text-base md:text-xl leading-none mb-2">percollate-api</p>
        <p class="text-gray-600 text-xs md:text-base">Public API by <a
          class="text-teal-500 no-underline hover:underline"
          href="https://github.com/yashha">yashha</a> to transform website content to pdf using the percollate package.</p>
      </div>
      <div class="justify-end">
        <a href="https://github.com/yashha/percollate-api"
          class="bg-transparent border border-gray-500 hover:border-teal-500 text-xs text-gray-500 hover:text-teal-500 font-bold py-2 px-4 rounded-full">
          Read More
        </a>
      </div>
    </div>

    <hr class="border-b-2 border-gray-400 mb-4 mx-4">
    <div class="flex w-full items-center font-sans px-4 py-12">
      <img class="w-10 h-10 rounded-full mr-4" src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.9.0/svgs/brands/github.svg" alt="Github">
      <div class="flex-1 px-2">
        <p class="text-base font-bold text-base md:text-xl leading-none mb-2">percollate</p>
        <p class="text-gray-600 text-xs md:text-base">A command-line tool to turn web pages into beautifully formatted PDFs  by <a
          class="text-teal-500 no-underline hover:underline"
          href="https://github.com/danburzo">danburzo</a>.</p>
      </div>
      <div class="justify-end">
        <a href="https://github.com/danburzo/percollate"
          class="bg-transparent border border-gray-500 hover:border-teal-500 text-xs text-gray-500 hover:text-teal-500 font-bold py-2 px-4 rounded-full">
          Read More
        </a>
      </div>
    </div>
    <hr class="border-b-2 border-gray-400 mb-8 mx-4">
  </div>
</div>
