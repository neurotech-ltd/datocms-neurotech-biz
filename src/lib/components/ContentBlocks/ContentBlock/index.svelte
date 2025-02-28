<script lang="ts">
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';
  import {
    isBlock,
    isCode,
    isHeading,
    isInlineItem,
    isItemLink,
  } from 'datocms-structured-text-utils';
  import {StructuredText} from '@datocms/svelte';
  import Code from '$lib/components/Code/index.svelte';
  import HeadingWithAnchorLink from '$lib/components/HeadingWithAnchorLink/index.svelte';
  import Block from '$lib/components/Block/index.svelte';
  import InlineItem from '$lib/components/InlineItem/index.svelte';
  import ItemLink from '$lib/components/ItemLink/index.svelte';
  import {ContentBlockFragment} from "./fragments";

  interface Props {
    data: FragmentOf<typeof ContentBlockFragment>;
    // flush?: boolean;
    // useMaxWidth?: boolean;
    // align?: string;
    // numberWang?: number;
    // children?: import('svelte').Snippet;
  }

  let {
    data,
    // flush = false,
    // useMaxWidth = false,
    // align = 'top',
    // numberWang = 0,
    // children,
  }: Props = $props();

  let unmaskedBlock = $derived(readFragment(ContentBlockFragment, data));

</script>

<!--{#snippet StructuredTextBloc(content)}-->
<!--{#if CustomContent}-->
<!--  {@render CustomContent(content)}-->
<!--{:else}-->
<!--  <h2 class="content-bloc-header">{content.header}</h2>-->
<!--  <StructuredText-->
<!--          data={content.structuredText}-->
<!--          components={[-->
<!--        [isCode, Code],-->
<!--        [isHeading, HeadingWithAnchorLink],-->
<!--        [isBlock, Block],-->
<!--        [isInlineItem, InlineItem],-->
<!--        [isItemLink, ItemLink],-->
<!--      ]}-->
<!--  />-->
<!--{/if}-->
<!--{/snippet}-->

<div class="content-block {unmaskedBlock.layoutTemplate} {unmaskedBlock.style}">
    <h2 class="content-bloc-header">{unmaskedBlock.header}</h2>
    <StructuredText
            data={unmaskedBlock.structuredText}
            components={[
          [isCode, Code],
          [isHeading, HeadingWithAnchorLink],
          [isBlock, Block],
          [isInlineItem, InlineItem],
          [isItemLink, ItemLink],
        ]}
    />
</div>

<!--{#if loaded}-->
<!--  <Inview sticky="true" delay={numberWang}>-->
<!--    <div-->
<!--      class="content-bloc {flush ? 'flush' : ''} {useMaxWidth ? 'content-maxWidth' : ''}  {align ===-->
<!--      'bottom'-->
<!--        ? 'content-align-bottom'-->
<!--        : 'content-align-top'}"-->
<!--    >-->
<!--      {@render children?.()}-->
<!--    </div>-->
<!--  </Inview>-->
<!--{:else}-->
<!--  &lt;!&ndash; Apparently visibility: hidden doesn't effect search engine&ndash;&gt;-->
<!--  <div-->
<!--    style="visibility: hidden"-->
<!--    class="content-block {flush ? 'flush' : ''} {useMaxWidth ? 'content-maxWidth' : ''}  {align ===-->
<!--    'bottom'-->
<!--      ? 'content-align-bottom'-->
<!--      : 'content-align-top'}"-->
<!--  >-->
<!--    {@render children?.()}-->
<!--  </div>-->
<!--{/if}-->

<style>
    /* set default margins of content.*/
    .content-block {
        display: block;
        /*margin: 0 var(--page-margin) var(--page-margin) var(--bloc-margin-bottom);*/
        margin: 0;
        width: auto;
        height: fit-content;

        /*Added to avoid scroll behaviour on parent element. (on page/slug )*/
        overflow-x: clip;
        max-width: 100vw;
    }


    .on_light {
        /*    Dark text on light background */
        background-color: #eaeaea;
        --text-color:#1C346C;
    }

    .on_dark {
        background-color: #1C346C;
        --text-color:white;
    }

    .centred_text_block {
        text-align: center;
        align-content: center;
        min-height: 400px;
        padding:var(--page-margin)
    }

    :global(.centred_text_block > p){
        max-width: 1024px;
        margin-left: auto;
        margin-right: auto;
    }

    .content-bloc-header {
        font-family: "Lato", serif;
        font-weight: 700;
        font-size: 72px;
        /*color: #1C346C;*/
    }

    /*.content-maxWidth {*/
    /*}*/

    /*.content-align-bottom {*/
    /*    align-content: flex-end;*/
    /*    height: 100%;*/
    /*}*/

    /*.content-align-top {*/
    /*}*/

    /*!* remove page padding so elements sit flush with edges of page. *!*/
    /*.flush {*/
    /*    margin-left: 0;*/
    /*    margin-right: 0;*/
    /*}*/

    /*@media (min-width: 768px) {*/
    /*    .content-maxWidth {*/
    /*        max-width: var(--page-max-content-width);*/
    /*    }*/
    /*}*/

    /*@media (min-width: 1024px) {*/
    /*    .content-maxWidth {*/
    /*        max-width: var(--page-max-content-width);*/
    /*    }*/
    /*}*/
</style>
