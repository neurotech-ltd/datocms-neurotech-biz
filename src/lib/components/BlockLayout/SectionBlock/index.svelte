<script lang="ts">
  import { onMount } from 'svelte';
  import ContentBloc from '$lib/components/BlockLayout/ContentBloc/index.svelte';

  interface Props {
    id?: string;
    flush?: boolean;
    title?: string;
    active?: boolean;
    showHeader?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    id,
    flush = false,
    showHeader = true,
    title = '',
    active = true,
    children,
  }: Props = $props();

  let loaded = $state(false);
  onMount(() => (loaded = true));
</script>

<div {id} class="section-bloc" class:inactive={!active}>
  {#if showHeader}
    {#if title}
      <ContentBloc>
        <h1 class="section-header">{title}</h1>
      </ContentBloc>
    {/if}
  {/if}
  {@render children?.()}
</div>

<style>
  /*
    A Section sits flush with the main page and assumes child content will add appropriate padding/margins.
    A sections only aims to delineate groups of content blocs with a header.
  */
  .section-bloc {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  /* Note that the default H1..Hn styles are styled for headers added to StructuredText
  As such we specifically style the headers here with custom classes.
  */
  .section-header {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 400;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .inactive {
    display: none;
  }
</style>
