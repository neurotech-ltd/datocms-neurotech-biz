<script lang="ts">
  import { onMount } from 'svelte';
  import Inview from '../../Inview/index.svelte';

  interface Props {
    flush?: boolean;
    useMaxWidth?: boolean;
    align?: string;
    numberWang?: number;
    children?: import('svelte').Snippet;
  }
  let {
    flush = false,
    useMaxWidth = false,
    align = 'top',
    numberWang = 0,
    children,
  }: Props = $props();
  // end WIP.
  let loaded = $state(false);
  onMount(() => (loaded = true));
</script>

{#if loaded}
  <Inview sticky="true" delay={numberWang}>
    <div
      class="content-bloc {flush ? 'flush' : ''} {useMaxWidth ? 'content-maxWidth' : ''}  {align ===
      'bottom'
        ? 'content-align-bottom'
        : 'content-align-top'}"
    >
      {@render children?.()}
    </div>
  </Inview>
{:else}
  <!-- Apparently visibility: hidden doesn't effect search engine-->
  <div
    style="visibility: hidden"
    class="content-bloc {flush ? 'flush' : ''} {useMaxWidth ? 'content-maxWidth' : ''}  {align ===
    'bottom'
      ? 'content-align-bottom'
      : 'content-align-top'}"
  >
    {@render children?.()}
  </div>
{/if}

<style>
  /* set default margins of content.*/
  .content-bloc {
    display: block;
    margin: 0 var(--page-margin) var(--page-margin) var(--bloc-margin-bottom);
    width: auto;
    height: fit-content;
    flex: 1 1 0;

    /*Added to avoid scroll behaviour on parent element. (on page/slug )*/
    overflow-x: clip;
    max-width: 100vw;
  }

  .content-maxWidth {
  }

  .content-align-bottom {
    align-content: flex-end;
    height: 100%;
  }

  .content-align-top {
  }

  /* remove page padding so elements sit flush with edges of page. */
  .flush {
    margin-left: 0;
    margin-right: 0;
  }

  @media (min-width: 768px) {
    .content-maxWidth {
      max-width: var(--page-max-content-width);
    }
  }

  @media (min-width: 1024px) {
    .content-maxWidth {
      max-width: var(--page-max-content-width);
    }
  }
</style>
