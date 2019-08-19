<script>
  let url = '';
  let orientation = '';
  let format = '';
  let customCss = '';
  let pagesPerSide = '';
  let fontSize = 12;

  $: isLoaded = false;

  $: {
    url = url + '';
    isLoaded = false;
  }

  let computed_url = '';
  $: {
    try {
      new URL(url);
      if (fontSize < 8 || fontSize > 16) {
        throw new Error('Wrong fontsize');
      }
      computed_url =
        'https://percollate-api.herokuapp.com/load.pdf?url=' +
        encodeURIComponent(url) +
        `&pagesperside=${pagesPerSide}` +
        '&' +
        'css=' +
        encodeURIComponent(`html { font-size: ${fontSize}pt }`) +
        encodeURIComponent(`@page { size: ${format} ${orientation} }`) +
        encodeURIComponent(customCss);
    } catch (e) {
      computed_url = '';
    }
  }

  async function iframeLoaded() {
    isLoaded = true;
  }
  function onSubmit(e) {
    e.preventDefault();
  }
  function clearInput() {
    url = '';
  }
</script>

<style type="text/scss">
  .paclient__iframe {
    position: absolute;
    height: 0;
  }
  .paclient__iframe.loaded {
    position: relative;
    width: 100%;
    height: 600px;
  }
  .paclient__search::-webkit-search-cancel-button {
    display: none;
  }
  .input-number-hide {
    -moz-appearance: textfield;
  }
  /* Webkit browsers like Safari and Chrome */
  .input-number-hide::-webkit-inner-spin-button,
  .input-number-hide::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>

<svelte:head>
  <title>Percollate API</title>
  <meta
    name="description"
    content="Make the web readable and printable by generating clean pdf." />
</svelte:head>
<div class="container w-full md:max-w-3xl mx-auto pt-20">

  <div
    class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal"
    style="font-family:Georgia,serif;">
    <div class="font-sans">
      <h1
        class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl
        md:text-4xl">
        Percollate API
      </h1>
    </div>
    <p class="py-6">
      👋 Welcome to the
      <a
        class="text-teal-500 no-underline hover:underline"
        href="https://github.com/yashha/percollate-api">
        Percollate API
      </a>
      a public API to transform website content to PDF using the percollate
      package.
    </p>

    <form class="w-full" on:submit={onSubmit}>
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold
        mb-2"
        for="url">
        URL
      </label>
      <div class="relative">
        <input
          class="paclient__search bg-gray-200 focus:outline-0
          focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block
          w-full appearance-none leading-normal pr-10"
          type="url"
          name="url"
          id="url"
          placeholder="Enter url"
          required
          bind:value={url} />
        {#if url}
          <div class="absolute right-0 top-0 mt-3 mr-3" on:click={clearInput}>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
        {/if}
      </div>

      <br />

      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold
            mb-2"
            for="format">
            FORMAT
          </label>
          <div class="relative">
            <select
              bind:value={format}
              class="block appearance-none w-full bg-gray-200 border
              border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500"
              id="format">
              <option value="a4">A4</option>
              <option value="a5" selected>A5</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex
              items-center px-2 text-gray-700">
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold
            mb-2"
            for="orientation">
            ORIENTATION
          </label>
          <div class="relative">
            <select
              bind:value={orientation}
              class="block appearance-none w-full bg-gray-200 border
              border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500"
              id="orientation">
              <option value="portrait" selected>portrait</option>
              <option value="landscape">landscape</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex
              items-center px-2 text-gray-700">
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold
            mb-2"
            for="pagesperside">
            PAGES PER SIDE
          </label>
          <div class="relative">
            <select
              bind:value={pagesPerSide}
              class="block appearance-none w-full bg-gray-200 border
              border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500"
              id="pagesperside">
              <option value="1" selected>1</option>
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex
              items-center px-2 text-gray-700">
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold
            mb-2"
            for="fontsize">
            FONT SIZE
          </label>
          <div class="relative">
            <input
              type="number"
              min="8"
              max="16"
              bind:value={fontSize}
              id="fontsize"
              class="block appearance-none w-full bg-gray-200 border
              border-gray-200 text-gray-700 py-3 px-4 pl-4 pr-4 rounded
              leading-tight focus:outline-none focus:bg-white
              focus:border-gray-500 input-number-hide" />
            <div
              class="absolute inset-y-0 right-0 flex items-center px-2
              text-gray-700 h-6"
              on:click={() => (fontSize = Math.min(fontSize + 1, 16))}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-4 w-4 mt-2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </div>
            <div
              class="absolute bottom-0 right-0 flex items-center px-2
              text-gray-700 h-6"
              on:click={() => (fontSize = Math.max(fontSize - 1, 8))}>
              <svg
                class="h-4 w-4 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
          <details>
            <summary>Custom CSS</summary>
            <label
              class="block uppercase tracking-wide text-gray-700 mt-3 text-xs
              font-bold mb-2"
              for="customcss">
              CUSTOM CSS
            </label>
            <div class="relative">
              <textarea
                bind:value={customCss}
                class="block appearance-none w-full bg-gray-200 border
                border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded
                leading-tight focus:outline-none focus:bg-white
                focus:border-gray-500"
                id="customcss" />
            </div>
          </details>
        </div>
      </div>
    </form>

    {#if computed_url}
      <div class="flex justify-center">
        <a
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4
          rounded inline-flex items-center"
          href={computed_url}
          download>
          <svg
            class="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download</span>
        </a>
      </div>
    {/if}
    <br />

    <div class="block w-full">
      {#if computed_url}
        <iframe
          class="paclient__iframe {isLoaded && url ? 'loaded' : ''}"
          src={computed_url}
          title="test"
          on:load={iframeLoaded} />
      {/if}
      {#if !isLoaded && computed_url}Loading ... this could take up to 30s{/if}
    </div>

    <br />

    <hr class="border-b-2 border-gray-400 mb-4 mx-4" />
    <div class="flex w-full items-center font-sans px-4 py-12">
      <img
        class="w-10 h-10 rounded-full mr-4"
        src="https://unpkg.com/@fortawesome/fontawesome-free@5.10.1/svgs/brands/github.svg"
        alt="Github" />
      <div class="flex-1 px-2">
        <p class="text-base font-bold text-base md:text-xl leading-none mb-2">
          percollate-api
        </p>
        <p class="text-gray-600 text-xs md:text-base">
          Public API by
          <a
            class="text-teal-500 no-underline hover:underline"
            href="https://github.com/yashha">
            yashha
          </a>
          to transform website content to pdf using the percollate package.
        </p>
      </div>
      <div class="justify-end">
        <a
          href="https://github.com/yashha/percollate-api"
          class="bg-transparent border border-gray-500 hover:border-teal-500
          text-xs text-gray-500 hover:text-teal-500 font-bold py-2 px-4
          rounded-full">
          Read More
        </a>
      </div>
    </div>

    <hr class="border-b-2 border-gray-400 mb-4 mx-4" />
    <div class="flex w-full items-center font-sans px-4 py-12">
      <img
        class="w-10 h-10 rounded-full mr-4"
        src="https://unpkg.com/@fortawesome/fontawesome-free@5.10.1/svgs/brands/github.svg"
        alt="Github" />
      <div class="flex-1 px-2">
        <p class="text-base font-bold text-base md:text-xl leading-none mb-2">
          percollate
        </p>
        <p class="text-gray-600 text-xs md:text-base">
          A command-line tool to turn web pages into beautifully formatted PDFs
          by
          <a
            class="text-teal-500 no-underline hover:underline"
            href="https://github.com/danburzo">
            danburzo
          </a>
          .
        </p>
      </div>
      <div class="justify-end">
        <a
          href="https://github.com/danburzo/percollate"
          class="bg-transparent border border-gray-500 hover:border-teal-500
          text-xs text-gray-500 hover:text-teal-500 font-bold py-2 px-4
          rounded-full">
          Read More
        </a>
      </div>
    </div>
    <hr class="border-b-2 border-gray-400 mb-8 mx-4" />
  </div>
</div>
