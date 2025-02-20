<script lang="ts">
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';
  import {ContentBlocksFragment} from './fragments';
  import ContentBloc from './ContentBlock/index.svelte';
  import SectionBlock from './SectionBlock/index.svelte';
  import {StructuredText} from '@datocms/svelte';
  import {
    isBlock,
    isCode,
    isHeading,
    isInlineItem,
    isItemLink,
  } from 'datocms-structured-text-utils';
  import Code from '$lib/components/Code/index.svelte';
  import HeadingWithAnchorLink from '$lib/components/HeadingWithAnchorLink/index.svelte';
  import Block from '$lib/components/Block/index.svelte';
  import InlineItem from '$lib/components/InlineItem/index.svelte';
  import ItemLink from '$lib/components/ItemLink/index.svelte';

  interface Props {
    data: FragmentOf<typeof ContentBlocksFragment>;
    numberWang: number;
  }

  let {data, CustomContent, numberWang}: Props = $props();
  let unmaskedBlock = $derived(readFragment(ContentBlocksFragment, data));
  $inspect(unmaskedBlock)
</script>

<!--
  This snippet defines the default StructuredText content from the CMS added to Content Blocs either nested within
  SectionBlocs.
-->
{#each unmaskedBlock as blockData, i}
<!--    <div>-->
<!--        {JSON.stringify(blockData.__typename)}<br/>-->
<!--        &lt;!&ndash;{JSON.stringify(blockData.blocs)}<br/>&ndash;&gt;-->
<!--    </div>-->
    {#if blockData.__typename === 'SectionBlockRecord'}
<!--        <div>hello {blockData.__typename}</div>-->
        <SectionBlock data={blockData} />

    {:else if blockData.__typename === 'ContentBlocRecord'}
        <ContentBloc data={blockData} {numberWang}>
        </ContentBloc>
    {/if}
{/each}



<style>
    /* Note that H1..Hn are styled for headers added tp StructuredText
      As such we specifically style layouts using H1 with custom classes.
      */
    .content-bloc-header {
        color: var(--text-color);
        text-decoration: none;
        font-family: 'Roboto Flex';
        font-weight: 300;
        font-size: 1.6rem;
        margin-bottom: 1rem;
    }
</style>
