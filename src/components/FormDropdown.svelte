<script lang="ts">
import IconDown from "./svg/icon-down.svelte";

export let value: string;
export let label = "";
export let name = "";
</script>

<div class="w-full px-3 mb-6 md:w-1/4 md:mb-0">
  <label
    class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
    for="{name}">
    {label}
  </label>
  <div class="relative">
    <select
      bind:value
      class="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
      id="{name}">
      <slot />
    </select>
    <div
      class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
      <IconDown />
    </div>
  </div>
</div>
