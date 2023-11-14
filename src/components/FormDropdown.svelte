<script lang="ts">
  import IconDown from './svg/icon-down.svelte';

  export let value: string;
  export let label = '';
  export let name = '';
</script>

<div class="mb-6 w-full px-3 md:mb-0 md:w-1/4">
  <label
    class="mb-2 block font-sans text-xs font-bold uppercase tracking-wide text-gray-700"
    for={name}
  >
    {label}
  </label>
  <div class="relative">
    <select
      bind:value
      class="block w-full appearance-none rounded border border-gray-200 bg-white px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
      id={name}
    >
      <slot />
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
    >
      <IconDown />
    </div>
  </div>
</div>
