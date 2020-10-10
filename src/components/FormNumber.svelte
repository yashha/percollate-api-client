<script lang="ts">
  import IconUp from '../svg/icon-up.svelte';
  import IconDown from '../svg/icon-down.svelte';

  export let value;
  export let name;
  export let label = '';
  export let maxValue = 16;
  export let minValue = 8;
</script>

<style>
  .input-number-hide {
    -moz-appearance: textfield;
  }
  /* Webkit browsers like Safari and Chrome */
  .input-number-hide::-webkit-inner-spin-button,
  .input-number-hide::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>

<div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
  <label
    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    for={name}>
    {label}
  </label>
  <div class="relative">
    <input
      type="number"
      min="8"
      max="16"
      bind:value
      id={name}
      class="block appearance-none w-full bg-gray-200 border border-gray-200
      text-gray-700 py-3 px-4 pl-4 pr-4 rounded leading-tight focus:outline-none
      focus:bg-white focus:border-gray-500 input-number-hide" />
    <div
      class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 h-6"
      on:click={() => (value = Math.min(value + 1, maxValue))}>
      <IconUp />
    </div>
    <div
      class="absolute bottom-0 right-0 flex items-center px-2 text-gray-700 h-6"
      on:click={() => (value = Math.max(value - 1, minValue))}>
      <IconDown />
    </div>
  </div>
</div>
