<script lang="ts">
import IconDown from './svg/icon-down.svelte';

export let value;
export let label = '';
export let name = '';
</script>

<div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
  <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="{name}">
    {label}
  </label>
  <div class="relative">
    <select
      bind:value
      class="block py-3 px-4 pr-8 w-full leading-tight text-gray-700 bg-gray-200 rounded border border-gray-200 appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
      id="{name}"
    >
      <slot />
    </select>
    <div
      class="flex absolute inset-y-0 right-0 items-center px-2 text-gray-700 pointer-events-none"
    >
      <IconDown />
    </div>
  </div>
</div>
