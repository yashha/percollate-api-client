<script lang="ts">
export let yes = false;
export let label = '';
</script>

<div class="mb-6 md:flex md:items-center">
  <label class="font-bold md:w-2/3">
    <input class="mr-2 leading-tight" type="checkbox" bind:checked="{yes}" />
    <span class="font-sans text-sm text-gray-700">{label}</span>
  </label>
</div>
