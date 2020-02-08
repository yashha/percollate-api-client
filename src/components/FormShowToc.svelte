<script>
  export let yes = false;
  export let label = 'Show table of contents!';
</script>

<div class="md:flex md:items-center mb-6">
  <label class="md:w-2/3 font-bold">
    <input class="mr-2 leading-tight" type="checkbox" bind:checked={yes} />
    <span class="text-sm text-gray-700">{label}</span>
  </label>
</div>
