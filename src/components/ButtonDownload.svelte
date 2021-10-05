<script lang="ts">
import IconDownload from './svg/icon-download.svelte';
import { _ } from 'svelte-i18n';

export let url: string;
</script>

<div class="flex justify-center">
  <a
    class="inline-flex items-center px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
    href="{url}"
    download>
    <IconDownload />
    <span>{$_('button_download_label')}</span>
  </a>
</div>
