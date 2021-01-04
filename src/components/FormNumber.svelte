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

<script lang="ts">
import IconUp from './svg/icon-up.svelte';
import IconDown from './svg/icon-down.svelte';

export let value;
export let name;
export let label = '';
export let maxValue = 16;
export let minValue = 8;
</script>

<div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
  <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="{name}">
    {label}
  </label>
  <div class="relative">
    <input
      type="number"
      min="8"
      max="16"
      bind:value
      id="{name}"
      class="block py-3 px-4 pr-4 pl-4 w-full leading-tight text-gray-700 bg-gray-200 rounded border border-gray-200 appearance-none focus:outline-none focus:bg-white focus:border-gray-500 input-number-hide"
    />
    <div
      class="flex absolute inset-y-0 right-0 items-center px-2 h-6 text-gray-700"
      on:click="{() => (value = Math.min(value + 1, maxValue))}"
    >
      <IconUp />
    </div>
    <div
      class="flex absolute right-0 bottom-0 items-center px-2 h-6 text-gray-700"
      on:click="{() => (value = Math.max(value - 1, minValue))}"
    >
      <IconDown />
    </div>
  </div>
</div>
