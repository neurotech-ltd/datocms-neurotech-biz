<script lang="ts">
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';
  import ContentBlock from "../ContentBlock/index.svelte";
  import {SectionBlockFragment} from "./fragments";
  import TeamBlock from "../TeamBlock/index.svelte";
  import ProjectsBlock from "../ProjectsBlock/index.svelte";
  import ContactBlock from "../ContactBlock/index.svelte";
  import MapBlock from "../MapBlock/index.svelte";
  import HeroImageBlock from "../HeroImageBlock/index.svelte";

  interface Props {
    data: FragmentOf<typeof SectionBlockFragment>;
    id?: string;
    // children?: import('svelte').Snippet;
  }

  let {
    data,
    id,
    // children,
  }: Props = $props();

  let unmaskedBlock = $derived(readFragment(SectionBlockFragment, data));

</script>

<div class="section-bloc">
    {#if unmaskedBlock.header}
        <div>
            <h1 class="section-header">{unmaskedBlock.header}</h1>
        </div>
    {/if}
    {#each unmaskedBlock.blocs as blocContent, i}
<!--        <div>{blocContent.__typename}</div>-->
        {#if blocContent.__typename === 'ContentBlockRecord'}
            <ContentBlock data={blocContent}></ContentBlock>
        {:else if blocContent.__typename === 'TeamBlockRecord'}
            <TeamBlock data={blocContent}></TeamBlock>

        {:else if blocContent.__typename === 'ProjectsBlockRecord'}
            <ProjectsBlock data={blocContent}></ProjectsBlock>

        {:else if blocContent.__typename === 'ContactBlockRecord'}
            <ContactBlock data={blocContent}></ContactBlock>
        {:else if blocContent.__typename === 'MapBlockRecord'}
            <MapBlock data={blocContent}></MapBlock>
        {:else if blocContent.__typename === 'HeroImageBlockRecord'}
            <HeroImageBlock data={blocContent}></HeroImageBlock>
        {/if}
    {/each}
</div>
<!--<div {id} class="section-bloc" class:inactive={!active}>-->
<!--    {#if showHeader}-->
<!--        {#if title}-->
<!--            <ContentBlock>-->
<!--                <h1 class="section-header">{title}</h1>-->
<!--            </ContentBlock>-->
<!--        {/if}-->
<!--    {/if}-->
<!--    &lt;!&ndash;{@render children?.()}&ndash;&gt;-->
<!--    {#each unmaskedBlock.blocs as blocContent, i}-->
<!--        {#if unmaskedBlock.__typename === 'ContentBlockRecord'}-->
<!--            <ContentBlock data={blocContent} numberWang={i + 1}>-->
<!--                {@render StructuredTextBloc(blocContent)}-->
<!--            </ContentBlock>-->
<!--            &lt;!&ndash;{:else if unmaskedBlock.__typename === 'ImageGalleryBlockRecord'}&ndash;&gt;-->

<!--        {/if}-->
<!--    {/each}-->
<!--</div>-->

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
