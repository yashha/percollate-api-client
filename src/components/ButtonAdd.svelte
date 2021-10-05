<script lang="ts">
import IconPlus from './svg/icon-plus.svelte';
import { _ } from 'svelte-i18n';
</script>

<button
  on:click
  title="{$_('button_add_title')}"
  class="inline-flex float-right items-center py-2 px-3 mt-4 w-10 h-10 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
  <IconPlus />
</button>
