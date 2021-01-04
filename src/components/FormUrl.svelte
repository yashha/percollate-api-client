<style>
.paclient__search::-webkit-search-cancel-button {
  display: none;
}
</style>

<script lang="ts">
import IconClose from './svg/icon-close.svelte';

export let url = '';
export let index;
</script>

<label
  class="block mt-5 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
  for="url-{index}"
>
  URL
</label>
<div class="relative">
  <input
    class="py-2 px-4 pr-10 w-full leading-normal bg-gray-200 rounded-lg border border-gray-300 appearance-none paclient__search focus:outline-0 mt-3 focus:shadow-outline block"
    type="url"
    name="url"
    id="url-{index}"
    placeholder="Enter url"
    required
    bind:value="{url}"
  />
  {#if url}
    <div style="width: 24px" class="absolute top-0 right-0 mt-3 mr-3" on:click="{() => (url = '')}">
      <IconClose />
    </div>
  {/if}
</div>
