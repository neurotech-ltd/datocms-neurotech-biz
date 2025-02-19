<script lang="ts">
  import { readFragment, type FragmentOf } from '$lib/datocms/graphql';
  import { InlineItemFragment } from './fragments';

  interface Props {
    link: FragmentOf<typeof InlineItemFragment>;
  }

  let { link }: Props = $props();

  let unmaskedLink = $derived(readFragment(InlineItemFragment, link));
  /*console.log(`JSON.stringify(unmaskedLink)`, JSON.stringify(unmaskedLink, null, 4));*/
</script>

<!--
  If a structured text includes a reference to another DatoCMS
  record, it's up to you to decide how to render them:
-->

{#if unmaskedLink.__typename === 'HomepageRecord' || unmaskedLink.__typename === 'PageRecord'}
  <a href="/" class="pill">{unmaskedLink.title}</a>
{/if}
