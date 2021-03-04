<script lang="ts">
import IconShare from "./svg/icon-share.svelte";

export let url: string;
</script>

<div class="flex justify-center">
  <a
    class="inline-flex items-center px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
    href="{url}">
    <IconShare />
    <span>Share</span>
  </a>
</div>
