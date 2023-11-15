<script lang="ts">
import IconShare from './svg/icon-share.svelte';
import { _ } from 'svelte-i18n';

export let url: string;
</script>

<div class="flex justify-center">
  <a
    class="inline-flex items-center rounded border border-gray-200 bg-white px-4 py-2 font-sans font-bold text-gray-800 hover:bg-gray-100"
    href="{url}"
  >
    <IconShare />
    <span>{$_('button_share_label')}</span>
  </a>
</div>
