<script lang="ts">
import { _, isLoading } from 'svelte-i18n';
import './i18n';

import Index from './pages/Index.svelte';
</script>

<div>
  {#if !$isLoading}
    <Index />
  {/if}
</div>
