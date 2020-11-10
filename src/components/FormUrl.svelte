<script lang="ts">
  import IconClose from './svg/icon-close.svelte';

  export let url = '';
  export let index;
</script>

<style>
  .paclient__search::-webkit-search-cancel-button {
    display: none;
  }
</style>

<label
  class="mt-5 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
  for="url-{index}">
  URL
</label>
<div class="relative">
  <input
    class="paclient__search bg-gray-200 focus:outline-0 mt-3
    focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block
    w-full appearance-none leading-normal pr-10"
    type="url"
    name="url"
    id="url-{index}"
    placeholder="Enter url"
    required
    bind:value={url} />
  {#if url}
    <div
      style="width: 24px"
      class="absolute right-0 top-0 mt-3 mr-3"
      on:click={() => (url = '')}>
      <IconClose />
    </div>
  {/if}
</div>
