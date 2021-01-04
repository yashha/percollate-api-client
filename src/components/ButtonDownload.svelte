<script lang="ts">
import IconDownload from './svg/icon-download.svelte';

export let url;
</script>

<div class="flex justify-center">
  <a
    class="inline-flex items-center py-2 px-4 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
    href="{url}"
    download
  >
    <IconDownload />
    <span>Download</span>
  </a>
</div>
