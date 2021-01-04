<script lang="ts">
export let yes = false;
export let label = '';
</script>

<div class="mb-6 md:flex md:items-center">
  <label class="md:w-2/3 font-bold">
    <input class="mr-2 leading-tight" type="checkbox" bind:checked="{yes}" />
    <span class="text-sm text-gray-700">{label}</span>
  </label>
</div>
