<script lang="ts">
import { onMount } from 'svelte';

import ButtonAdd from './components/ButtonAdd.svelte';
import ButtonDownload from './components/ButtonDownload.svelte';
import ButtonShare from './components/ButtonShare.svelte';
import FormCheckbox from './components/FormCheckbox.svelte';
import FormDropdown from './components/FormDropdown.svelte';
import FormNumber from './components/FormNumber.svelte';
import FormUrl from './components/FormUrl.svelte';

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

<div class="container pt-20 mx-auto md:pt-20">
  <div
    class="w-full px-4 mx-auto text-xl leading-normal text-gray-800 md:px-70"
    style="font-family: Georgia, serif;">
    <div class="font-sans">
      <h1
        class="pt-6 pb-2 font-sans text-3xl font-bold text-gray-900 break-normal md:text-4xl">
        Read the web!
      </h1>
    </div>
    <p class="py-6">
      👋 Welcome to the Read the Web! Make the web more readable and printable
      by generating clean pdf.
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

      <div class="flex flex-wrap mb-2 -mx-3">
        <FormDropdown label="FORMAT" name="format" bind:value="{format}">
          <option value="a4">A4</option>
          <option value="a5" selected>A5</option>
        </FormDropdown>
        <FormDropdown
          label="PAGES PER SIDE"
          name="pagesperside"
          bind:value="{pagesPerSide}">
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="4">4</option>
        </FormDropdown>
        <FormNumber label="FONT SIZE" name="fontsize" bind:value="{fontSize}" />
        {#if advanced}
          <div class="w-full px-3 mt-6 mb-6 md:w-1/3 md:mb-0">
            <details>
              <summary>Custom CSS</summary>
              <label
                class="block mt-3 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                for="customcss">
                CUSTOM CSS
              </label>
              <div class="relative">
                <textarea
                  bind:value="{customCss}"
                  class="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="customcss"></textarea>
              </div>
            </details>
          </div>
        {/if}
      </div>
    </form>
    <div class="flex justify-center mx-auto mt-6 space-x-4">
      {#if urls.length > 0 && urls[0] !== ''}
        <span><ButtonDownload url="{downloadUrl}" /></span>
      {/if}
      <span><ButtonShare url="{shareUrl}" /></span>
    </div>
    <br />
  </div>
</div>
