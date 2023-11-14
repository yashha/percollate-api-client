<script lang="ts">
  import IconUp from './svg/icon-up.svelte';
  import IconDown from './svg/icon-down.svelte';

  export let value: number;
  export let name: string;
  export let label = '';
  export let maxValue = 16;
  export let minValue = 8;
</script>

<div class="mb-6 w-full px-3 md:mb-0 md:w-1/4">
  <label
    class="mb-2 block font-sans text-xs font-bold uppercase tracking-wide text-gray-700"
    for={name}
  >
    {label}
  </label>
  <div class="relative">
    <input
      type="number"
      min="8"
      max="16"
      bind:value
      id={name}
      class="input-number-hide block w-full appearance-none rounded border border-gray-200 px-4 py-3 pl-4 pr-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
    />
    <button
      aria-label="Up"
      class="absolute inset-y-0 right-0 flex h-6 items-center px-2 text-gray-700"
      on:click={() => (value = Math.min(value + 1, maxValue))}
    >
      <IconUp />
    </button>
    <button
      aria-label="Down"
      class="absolute bottom-0 right-0 flex h-6 items-center px-2 text-gray-700"
      on:click={() => (value = Math.max(value - 1, minValue))}
    >
      <IconDown />
    </button>
  </div>
</div>

<style>
  .input-number-hide {
    -moz-appearance: textfield;
    appearance: textfield;
  }
  /* Webkit browsers like Safari and Chrome */
  .input-number-hide::-webkit-inner-spin-button,
  .input-number-hide::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
