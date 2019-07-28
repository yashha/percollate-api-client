<style>
  :global(main) {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
</style>
<script>
  import { onMount } from 'svelte';
  let url;
  onMount(() => {
    let urlParams = new URLSearchParams(window.location.search);
    url = urlParams.get('url');
  });
</script>

<iframe src="{url}" title="test"></iframe>
