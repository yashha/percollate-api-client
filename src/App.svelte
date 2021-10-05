<script lang="ts">  
import { _, isLoading } from 'svelte-i18n';
import './i18n';

import Index from './pages/Index.svelte';
</script>

{#if !$isLoading}
    <Index></Index>
{/if}