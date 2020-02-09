<script>
  import IconShare from '../svg/icon-share.svelte';

  export let url;
</script>

<div class="flex justify-center mt-6">
  <a
    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4
    rounded inline-flex items-center"
    href={url}>
    <IconShare />
    <span>Share</span>
  </a>
</div>
