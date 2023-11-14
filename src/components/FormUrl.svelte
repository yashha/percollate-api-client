<script lang="ts">
  import IconClose from './svg/icon-close.svelte';
  import { _ } from 'svelte-i18n';

  export let url = '';
  export let index: number;
</script>

<label
  class="mb-2 mt-5 block font-sans text-xs font-bold uppercase tracking-wide text-gray-700"
  for="url-{index}"
>
  URL
</label>
<div class="relative">
  <input
    class="paclient__search focus:shadow-outline mt-2 block w-full appearance-none rounded-lg border border-gray-300 px-4 py-2 pr-10 font-sans leading-normal focus:outline-0"
    type="url"
    name="url"
    id="url-{index}"
    placeholder={$_('form_url_placeholder')}
    required
    bind:value={url}
  />
  {#if url}
    <button
      style="width: 24px"
      class="absolute right-0 top-0 mr-3 mt-3 cursor-pointer"
      on:click={() => (url = '')}
    >
      <IconClose />
    </button>
  {/if}
</div>

<style>
  .paclient__search::-webkit-search-cancel-button {
    display: none;
  }
</style>
