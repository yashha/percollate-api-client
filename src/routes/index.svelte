<script>
  import { onMount } from 'svelte';

  import IconClose from './svg/icon-close.svelte';
  import ButtonAdd from '../components/ButtonAdd.svelte';
  import FormShowToc from '../components/FormShowToc.svelte';

  let urls = [''];
  let format = 'a5';
  let customCss = '';
  let pagesPerSide = '1';
  let fontSize = 12;
  let showToc = false;

  let computed_url = '';

  $: isLoaded = false;

  $: {
    urls = [...urls];
    format = format;
    customCss = customCss;
    pagesPerSide = pagesPerSide;
    fontSize = fontSize;
    showToc = showToc;
    isLoaded = false;
    buildUrl();
  }

  async function iframeLoaded() {
    isLoaded = true;
  }
  function onSubmit(e) {
    e.preventDefault();
  }
  function clearInput(index) {
    urls[index] = '';
  }
  function addUrlInput() {
    urls = [...urls, ''];
  }
  function isValidUrl() {
    for (const url of urls) {
      if (url !== '') {
        new URL(url);
      }
    }
  }
  function buildUrl() {
    try {
      let urls_query = '';
      for (const url of urls) {
        if (url !== '') {
          new URL(url);
          urls_query += '&url=' + encodeURIComponent(url);
        }
      }
      if (fontSize < 8 || fontSize > 16) {
        throw new Error('Wrong fontsize');
      }
      computed_url =
        'https://rusingeadtheweb.herokuapp.com/load.pdf?' +
        urls_query +
        `&pagesperside=${pagesPerSide}` +
        '&' +
        'css=' +
        encodeURIComponent(`html { font-size: ${fontSize}pt }`) +
        encodeURIComponent(`@page { size: ${format} portrait }`) +
        encodeURIComponent(customCss);
      if (showToc) {
        computed_url += '&toc=true';
      }
    } catch (e) {
      computed_url = '';
    }
  }

  onMount(async () => {
    await fetch('https://readtheweb.herokuapp.com/');
  });
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
  <title>Read the web!</title>
  <meta
    name="description"
    content="Make the web more readable and printable by generating clean pdf." />
</svelte:head>
<div class="container w-full md:max-w-3xl mx-auto pt-20">

  <div
    class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal"
    style="font-family:Georgia,serif;">
    <div class="font-sans">
      <h1
        class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl
        md:text-4xl">
        Read the web!
      </h1>
    </div>
    <p class="py-6">
      👋 Welcome to the Read the Web! Make the web more readable and printable
      by generating clean pdf.
    </p>

    <form class="w-full" on:submit={onSubmit}>
      {#each urls as url, index}
        <label
          class="mt-5 block uppercase tracking-wide text-gray-700 text-xs
          font-bold mb-2"
          for="url-{index}">
          URL
        </label>
        <div class="relative">
          <input
            class="paclient__search bg-gray-200 focus:outline-0 mt-3
            focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4
            block w-full appearance-none leading-normal pr-10"
            type="url"
            name="url"
            id="url-{index}"
            placeholder="Enter url"
            required
            bind:value={url} />
          {#if url}
            <div
              class="absolute right-0 top-0 mt-3 mr-3"
              on:click={() => clearInput(index)}>
              <IconClose />
            </div>
          {/if}
        </div>
      {/each}

      <ButtonAdd on:click={addUrlInput} />

      <br />

      <br />

      {#if urls.length > 1}
        {showToc}
        <FormShowToc bind:yes={showToc} />
      {/if}

      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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

    {#if urls.length > 0 && urls[0] !== ''}
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
          class="paclient__iframe {isLoaded && urls[0] ? 'loaded' : ''}"
          src={computed_url}
          title="test"
          on:load={iframeLoaded} />
      {/if}
      {#if !isLoaded && computed_url}Loading ... this could take up to 30s{/if}
    </div>
  </div>
</div>
