<script lang="ts">
import IconPlus from './svg/icon-plus.svelte';
import { _ } from 'svelte-i18n';
</script>

<button
  on:click
  title="{$_('button_add_title')}"
  class="float-right mt-4 inline-flex h-10 w-10 items-center rounded border border-gray-200 bg-white px-3 py-2 font-sans font-bold text-gray-800 hover:bg-gray-100"
>
  <IconPlus />
</button>
