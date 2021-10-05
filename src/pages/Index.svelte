<script lang="ts">
  import { onMount } from 'svelte';
  import Meta from 'svelte-meta';
  import { _ } from 'svelte-i18n';

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

  let downloadUrl = '';
  let shareUrl = '';
  let mounted = false;
  const advanced: boolean =
    new URLSearchParams(decodeURI(window.location.search)).get('advanced') === '';

  $: {
    urls = [...urls];
    format = format;
    customCss = customCss;
    pagesPerSide = pagesPerSide;
    fontSize = fontSize;
    showToc = showToc;

    const css = `
              html { font-size: ${fontSize}pt }
              @page { size: ${format} portrait }
              ${customCss}
            `;
    const url = buildUrl();
    url.searchParams.append('css', css);
    downloadUrl = url.href;
    createShareUrl();
  }

  function onSubmit(e: Event) {
    e.preventDefault();
  }
  function addUrlInput() {
    urls = [...urls, ''];
  }
  function createShareUrl() {
    if (!mounted) {
      return;
    }
    shareUrl = '?' + buildUrl().searchParams.toString();
  }
  function buildUrl() {
    const apiurl = 'https://readtheweb.de/api/load.pdf';
    const myUrlWithParams = new URL(apiurl);
    myUrlWithParams.searchParams.append('pagesperside', pagesPerSide);
    urls.forEach((item) => {
      myUrlWithParams.searchParams.append('url', item);
    });
    if (showToc) {
      myUrlWithParams.searchParams.append('toc', 'true');
    }
    myUrlWithParams.searchParams.append('fontsize', fontSize.toString());
    myUrlWithParams.searchParams.append('format', format);
    myUrlWithParams.searchParams.append('customcss', customCss);
    return myUrlWithParams;
  }
  function loadQuery() {
    const urlParams = new URLSearchParams(decodeURI(window.location.search));
    if (urlParams.get('url')) {
      urls = urlParams.getAll('url');
    }
    format = urlParams.get('format') ? urlParams.get('format') : format;
    fontSize = urlParams.get('fontsize')
      ? parseInt(urlParams.get('fontsize'))
      : fontSize;
    pagesPerSide = urlParams.get('pagesperside')
      ? urlParams.get('pagesperside')
      : pagesPerSide;
    showToc = urlParams.get('toc') ? urlParams.get('toc') === 'true' : showToc;
    customCss = urlParams.get('customcss')
      ? urlParams.get('customcss')
      : customCss;
  }
  onMount(async () => {
    mounted = true;
    loadQuery();
  });
</script>

<Meta
  title="Read the web! - Make websites readable"
  description="Make the web more readable and printable by generating clean pdf."
  url="https://readtheweb.de/"
  openGraph={{
    type: 'website',
    locale: 'en_US'
  }}
/>

<div class="container mx-auto pt-20 md:pt-20">
  <div
    class="mx-auto text-xl leading-normal w-full px-4 text-gray-800 md:px-20 lg:px-70"
    style="font-family: Georgia, serif;">
    <div class="font-sans">
      <h1
        class="font-sans font-bold pt-6 pb-2 text-3xl text-gray-900 break-normal md:text-4xl">
        {$_('page_title')}
      </h1>
    </div>
    <p class="py-6">
      {$_('page_introduction')}
    </p>

    <form class="w-full" on:submit="{onSubmit}">
      {#each urls as url, index}
        <FormUrl bind:url index="{index}" />
      {/each}

      <ButtonAdd on:click="{addUrlInput}" />

      <br />

      <br />

      {#if urls.length > 1}
        <FormCheckbox bind:yes="{showToc}" label="Show table of contents!" />
      {/if}

      <div class="flex flex-wrap -mx-3 mb-2">
        <FormDropdown label="FORMAT" name="format" bind:value="{format}">
          <option value="a4">A4</option>
          <option value="a5" selected>A5</option>
        </FormDropdown>
        <FormDropdown
          label="{$_('form_pages_per_side')}"
          name="pagesperside"
          bind:value="{pagesPerSide}">
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="4">4</option>
        </FormDropdown>
        <FormNumber label="{$_('form_font_size')}" name="fontsize" bind:value="{fontSize}" />
        {#if advanced}
          <div class="mt-6 mb-6 w-full px-3 md:mb-0 md:w-1/3">
            <details>
              <summary>Custom CSS</summary>
              <label
                class="font-bold mt-3 text-xs mb-2 tracking-wide text-gray-700 block uppercase"
                for="customcss">
                CUSTOM CSS
              </label>
              <div class="relative">
                <textarea
                  bind:value="{customCss}"
                  class="border rounded bg-gray-200 border-gray-200 leading-tight w-full py-3 px-4 pr-8 text-gray-700 block appearance-none focus:bg-white focus:outline-none focus:border-gray-500"
                  id="customcss"></textarea>
              </div>
            </details>
          </div>
        {/if}
      </div>
    </form>
    <div class="flex mx-auto space-x-4 mt-6 justify-center">
      {#if urls.length > 0 && urls[0] !== ''}
        <span><ButtonDownload url="{downloadUrl}" /></span>
      {/if}
      <span><ButtonShare url="{shareUrl}" /></span>
    </div>
    <br />
  </div>
</div>
