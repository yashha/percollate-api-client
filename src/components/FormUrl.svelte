<style>
.paclient__search::-webkit-search-cancel-button {
  display: none;
}
</style>

<script lang="ts">
import IconClose from "./svg/icon-close.svelte";

export let url = "";
export let index: number;
</script>

<label
  class="block mt-5 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
  for="url-{index}">
  URL
</label>
<div class="relative">
  <input
    class="block w-full px-4 py-2 pr-10 mt-3 leading-normal bg-gray-200 border border-gray-300 rounded-lg appearance-none paclient__search focus:outline-0 focus:shadow-outline"
    type="url"
    name="url"
    id="url-{index}"
    placeholder="Enter url"
    required
    bind:value="{url}" />
  {#if url}
    <div
      style="width: 24px"
      class="absolute top-0 right-0 mt-3 mr-3"
      on:click="{() => (url = '')}">
      <IconClose />
    </div>
  {/if}
</div>
