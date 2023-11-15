<script lang="ts">
import { onMount } from 'svelte';
import { MetaTags } from 'svelte-meta-tags';
import { _, getLocaleFromNavigator } from 'svelte-i18n';

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
let locale = getLocaleFromNavigator();

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
  const apiurl = 'https://api.readtheweb.de/load.pdf';
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

<MetaTags
  title="Read the web! - Make websites readable"
  description="Make the web more readable and printable by generating clean pdf."
  canonical="https://readtheweb.de/"
  openGraph="{{
    type: 'website',
    locale,
  }}"
/>

<div class="container mx-auto max-w-screen-lg pt-6 md:pt-24">
  <div
    class="lg:px-70 mx-auto w-full px-4 text-xl leading-normal text-gray-800 md:px-20"
    style="font-family: Georgia, serif;"
  >
    <div class="font-sans">
      <h1
        class="break-normal pb-2 pt-6 font-sans text-4xl font-bold text-gray-900 md:text-5xl"
      >
        {$_('page_title')}
      </h1>
    </div>
    <p class="font-sans md:py-6">
      {$_('page_introduction')}
    </p>

    <form class="w-full" on:submit="{onSubmit}">
      {#each urls as url, index}
        <FormUrl bind:url {index} />
      {/each}

      <ButtonAdd on:click="{addUrlInput}" />

      <br />

      <br />

      {#if urls.length > 1}
        <FormCheckbox bind:yes="{showToc}" label="Show table of contents!" />
      {/if}

      <div class="-mx-3 mb-2 flex flex-wrap">
        <FormDropdown label="FORMAT" name="format" bind:value="{format}">
          <option value="a4">A4</option>
          <option value="a5" selected>A5</option>
        </FormDropdown>
        <FormDropdown
          label="{$_('form_pages_per_side')}"
          name="pagesperside"
          bind:value="{pagesPerSide}"
        >
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="4">4</option>
        </FormDropdown>
        <FormNumber
          label="{$_('form_font_size')}"
          name="fontsize"
          bind:value="{fontSize}"
        />
        {#if advanced}
          <div class="mb-6 mt-6 w-full px-3 md:mb-0 md:w-1/3">
            <details>
              <summary>Custom CSS</summary>
              <label
                class="mb-2 mt-3 block font-sans text-xs font-bold uppercase tracking-wide text-gray-700"
                for="customcss"
              >
                CUSTOM CSS
              </label>
              <div class="relative">
                <textarea
                  bind:value="{customCss}"
                  class="block w-full appearance-none rounded border border-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="customcss"
                ></textarea>
              </div>
            </details>
          </div>
        {/if}
      </div>
    </form>
    <div
      class="mx-auto mb-12 flex max-w-max flex-row justify-center space-x-4 md:mt-12"
    >
      {#if urls.length > 0 && urls[0] !== ''}
        <span><ButtonDownload url="{downloadUrl}" /></span>
        <span><ButtonShare url="{shareUrl}" /></span>
      {/if}
    </div>
    <br />
  </div>
</div>
