<script>
  import { onMount } from 'svelte';
  import urlcat, { query } from 'urlcat';

  import IconClose from '../svg/icon-close.svelte';
  import ButtonAdd from '../components/ButtonAdd.svelte';
  import ButtonDownload from '../components/ButtonDownload.svelte';
  import ButtonShare from '../components/ButtonShare.svelte';
  import FormCheckbox from '../components/FormCheckbox.svelte';
  import FormDropdown from '../components/FormDropdown.svelte';
  import FormNumber from '../components/FormNumber.svelte';
  import FormUrl from '../components/FormUrl.svelte';

  let urls = [''];
  let format = 'a5';
  let customCss = '';
  let pagesPerSide = '1';
  let fontSize = 12;
  let showToc = false;

  let computed_url = '';
  let share_url = '';
  let mounted = false;

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
    createShareUrl();
  }

  async function iframeLoaded() {
    isLoaded = true;
  }
  function onSubmit(e) {
    e.preventDefault();
  }
  function addUrlInput() {
    urls = [...urls, ''];
  }
  function buildUrl() {
    const apiurl = 'https://api.readtheweb.de';
    const css = `
      html { font-size: ${fontSize}pt }
      @page { size: ${format} portrait }
      ${customCss}
    `;
    computed_url = urlcat(apiurl, '/load.pdf', {
      css,
      pagesperside: pagesPerSide,
      urls,

      toc: showToc ? true : null
    });
  }
  function createShareUrl() {
    if (!mounted) {
      return;
    }
    share_url =
      '/?' +
      query({
        urls,
        format,
        fontsize: fontSize,
        pagesperside: pagesPerSide,
        customcss: customCss,
        toc: showToc ? true : null
      });
  }
  function loadQuery() {
    const urlParams = new URLSearchParams(decodeURI(window.location.search));
    if (urlParams.get('urls') && urlParams.get('urls').split(',').length > 0) {
      urls = urlParams.get('urls').split(',');
    }
    format = urlParams.get('format') ? urlParams.get('format') : format;
    fontSize = urlParams.get('fontsize') ? urlParams.get('fontsize') : fontSize;
    pagesPerSide = urlParams.get('pagesperside')
      ? urlParams.get('pagesperside')
      : pagesPerSide;
    showToc = urlParams.get('toc') ? urlParams.get('toc') : showToc;
    customCss = urlParams.get('customcss')
      ? urlParams.get('customcss')
      : customCss;
  }
  onMount(async () => {
    mounted = true;
    loadQuery();
    await fetch('https://api.readtheweb.de/');
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
</style>

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
        <FormUrl bind:url {index} />
      {/each}

      <ButtonAdd on:click={addUrlInput} />

      <br />

      <br />

      {#if urls.length > 1}
        <FormCheckbox bind:yes={showToc} label="Show table of contents!" />
      {/if}

      <div class="flex flex-wrap -mx-3 mb-2">
        <FormDropdown label="FORMAT" name="format" bind:value={format}>
          <option value="a4">A4</option>
          <option value="a5" selected>A5</option>
        </FormDropdown>
        <FormDropdown
          label="PAGES PER SIDE"
          name="pagesperside"
          bind:value={pagesPerSide}>
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="4">4</option>
        </FormDropdown>
        <FormNumber label="FONT SIZE" name="fontsize" bind:value={fontSize} />
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
      <ButtonDownload url={computed_url} />
    {/if}
    <ButtonShare url={share_url} />
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
