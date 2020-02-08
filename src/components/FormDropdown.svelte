<script>
  import IconDown from '../svg/icon-down.svelte';

  export let value;
  export let label = '';
  export let name = '';
</script>

<div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
  <label
    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    for={name}>
    {label}
  </label>
  <div class="relative">
    <select
      bind:value
      class="block appearance-none w-full bg-gray-200 border border-gray-200
      text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none
      focus:bg-white focus:border-gray-500"
      id={name}>
      <slot />
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center
      px-2 text-gray-700">
      <IconDown />
    </div>
  </div>
</div>
