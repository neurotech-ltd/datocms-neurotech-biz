<script lang="ts">
  import { Head, Image, querySubscription, StructuredText } from '@datocms/svelte';
  import {
    isBlock,
    isCode,
    isHeading,
    isInlineItem,
    isItemLink,
  } from 'datocms-structured-text-utils';
  import HeadingWithAnchorLink from '$lib/components/HeadingWithAnchorLink/index.svelte';
  import Block from '$lib/components/Block/index.svelte';
  import InlineItem from '$lib/components/InlineItem/index.svelte';
  import ItemLink from '$lib/components/ItemLink/index.svelte';
  import Code from '$lib/components/Code/index.svelte';
  import type { ProjectData } from './$types';
  import ResponsiveImage from '$lib/components/ResponsiveImage/index.svelte';
  import { onMount, afterUpdate } from 'svelte';
  import { ColorUtils } from '$lib/colorUtils';
  import Icon from '../../../lib/components/Icon/index.svelte';
  import Pill from '../../../lib/components/Pill/index.svelte';
  import BlockLayout from '../../../lib/components/BlockLayout/index.svelte';
  import MyImage from '../../../lib/components/MyImage/index.svelte';

  // just in case it becomes a problem https://github.com/lazd/iNoBounce

  export let data: ProjectData;
  $: subscription = querySubscription(data.subscription);
  $: project = $subscription.data?.project;
  $: projectContent = $subscription.data?.project.content;
  $: projects = $subscription.data?.allProjects;

  let prevProjectSlug = '';
  let nextProjectSlug = '';

  function updateProjectStyles() {
    if (project) {
      let root = document.querySelector('.project-page');
      root.style.setProperty('--bg-fill', project.bgFill.hex);
      root.style.setProperty('--border-fill', project.bgBorder.hex);
      root.style.setProperty('--text-fill', project.clientTextFill.hex);
      let themeMode = ColorUtils.getContrastTheme(project.bgFill.hex);
      root.style.setProperty('--text-color', themeMode == 'light' ? '#FFF' : '#000');

      // icons
      root.style.setProperty('--icon-color', themeMode == 'light' ? '#FFF' : '#000');
      root.style.setProperty('--icon-fill', themeMode == 'light' ? 'transparent' : 'transparent');

      root.style.setProperty('--letter-count', project.client.length);
    }
  }

  function getProjectSlugs(projects, slug) {
    const index = projects.findIndex((project) => project.slug === slug);
    const currentIndex = index !== -1 ? index : 0;
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    const nextIndex = (currentIndex + 1) % projects.length;
    return {
      currentSlug: projects[currentIndex].slug,
      prevSlug: projects[prevIndex].slug,
      nextSlug: projects[nextIndex].slug,
    };
  }

  let itemList = [];
  onMount(() => {
    // console.log('Project.onMount():  ', project.slug);
    updateProjectStyles();
    const { currentSlug, prevSlug, nextSlug } = getProjectSlugs(projects, project.slug);
    prevProjectSlug = prevSlug;
    nextProjectSlug = nextSlug;
  });

  afterUpdate(() => {
    // console.log('Project.afterUpdate():  ', project.slug);
    updateProjectStyles();
    const { currentSlug, prevSlug, nextSlug } = getProjectSlugs(projects, project.slug);
    prevProjectSlug = prevSlug;
    nextProjectSlug = nextSlug;
  });

  let size = 70;
  let barWidth = 2;
</script>

{#if project}
  <div class="project-page" id={project.slug}>
    <div class="title-wrapper">
      <div class="client-title">{project.client}</div>
    </div>
    <div
      class="project"
      style="--bar-start:{size}; --blur-start:{100 - size}; --bar-width:{barWidth}"
    >
      <div class="headline">
        <MyImage
          data={project.heroImage.responsiveImage}
          shredded={true}
          width="460"
          height="259"
        />
        <h1>{project.title}</h1>
        {#if project.featurePills.length > 0}
          <div class="pills">
            {#each project.featurePills.split(',') as pill, i}
              <Pill label={pill} />
            {/each}
          </div>
        {/if}
      </div>
      <div class="content-bloc-column">
        {#snippet CustomContent(content)}
          <!-- Passed into <BlockLayout> to customise how content is laid out.-->
          <div class="copy-bloc">
            <h1>{content.header}</h1>
            <StructuredText
              data={content.structuredText}
              components={[
                [isCode, Code],
                [isHeading, HeadingWithAnchorLink],
                [isBlock, Block],
                [isInlineItem, InlineItem],
                [isItemLink, ItemLink],
              ]}
            />
          </div>
        {/snippet}

        {#each projectContent as content, i}
          <BlockLayout data={content} {CustomContent} numberWang={i + 1} />
        {/each}
      </div>
    </div>
    <div class="project-nav">
      <a href="/project/{prevProjectSlug}" rel="no-prefetch" aria-label="prev">
        <Icon type="back" />
      </a>
      <a href="/" aria-label="home">
        <Icon type="home" />
      </a>
      <a href="/project/{nextProjectSlug}" rel="no-prefetch" aria-label="next">
        <Icon type="next" />
      </a>
    </div>
  </div>
{/if}

<style lang="css">
  /***********************************************************/
  /* Copy blocs */
  /***********************************************************/
  .content-bloc-column {
    /*display: grid;*/
    /*grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));*/
    display: flex;
    flex: 1 1 0;
    /*flex-wrap: wrap;*/
    flex-direction: column;
    height: 100%;
    width: 100%;
    gap: 10px;
    /* 16 is the bottom nav padding dimension*/
    margin-bottom: calc(var(--page-border-thickness) * 2 + (16 * 2) * 1px);
  }

  /* align content blocs with elements above. */
  :global(.content-bloc-column > div:first-child > .content-bloc) {
    margin-left: 0;
  }

  :global(.content-bloc-column > div:last-child > .content-bloc) {
    margin-right: 0;
  }

  .copy-bloc {
    min-width: calc(var(--page-max-content-width) - (var(--page-margin) * 2));
    max-width: var(--page-max-content-width);
    height: fit-content;
  }

  @media (min-width: 700px) {
    .content-bloc-column {
      flex-direction: row;
    }

    .copy-bloc {
    }
  }

  /***********************************************************/
  /* Main page layout. */
  /***********************************************************/

  .project-page {
    --letter-count: 5;
    --text-color: var(--text-color);
    border-width: var(--page-border-thickness);
    border-style: solid;
    border-color: var(--border-fill);
    background-color: var(--bg-fill);
    overflow-y: auto;
    /* not sure why, but some pages from the cms wouldn't render correctly without width and height set. */
    /*@formatter:off*/
    /*noinspection CssInvalidPropertyValue*/
    width: 100dvw;
    /*noinspection CssInvalidPropertyValue*/
    min-height: 100dvh;
    /*noinspection CssInvalidPropertyValue*/
    max-height: 100dvh;
    /*@formatter:on*/
    /* Animation   */
    transition:
      background-color 300ms ease-out,
      border-color 300ms ease-out;
  }

  .project-page::-webkit-scrollbar {
    display: none;
  }

  /*
        Page specific.
        */
  .project {
    transition: padding 0.5s ease;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    width: 100%;
    position: relative;
    padding-top: 60px;
    padding-left: var(--page-margin);
    padding-right: var(--page-margin);
    /*overflow: hidden;*/
    /*z-index: 2;*/
    /* disable ios scroll bounce */
    overscroll-behavior: none;
  }

  @media (min-width: 700px) {
    .project {
      padding-top: calc(var(--page-margin) * 2);
      padding-left: calc(var(--page-margin) * 2);
      padding-right: calc(var(--page-margin) * 2);
    }
  }

  /*
         :global .project-page xyz seems to be the only way to style elements that are dynamically added by code.
         Note that you should avoid styling such as :global(p) as this will style all subsequent pages loaded.
         instead make sure to include the .project-page selector.
         */
  :global(.project-page .content *) {
    max-width: var(--page-max-content-width);
  }

  /*
            Very specific setup to get text to sit behind content at an angle and fit the page width.
            .title-wrapper and .client-title work together to get the effect I wanted, angle text
            that scales to fit the dimensions of the window.
            Note: Angle elements break overflows and sizing of parent/sibling elements, hence the pain.
            Also, the element needs to sit above the coloured border of the .page-content styling, but
            below everythign else.
        */
  .title-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .client-title {
    text-transform: uppercase;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(20deg);
    /*font-size: calc(  (45 + (6 * (5 - var(--letter-count)  ) ) ) * 1vw );*/
    font-size: 45vw;
    color: var(--text-fill);
    font-weight: 400;
    font-family: 'Arial', sans-serif; /*THis is the text that sits behind everything, it should be the client font.*/
    /*z-index: 1;*/
    white-space: nowrap;
    /* Animation   */
    transition: color 300ms ease-out;
  }

  /* End of title css */

  /********/
  /* project page side nav*/
  /********/
  .project-nav {
    /*position: absolute;*/
    /*top: 50%;*/
    /*bottom: 50%;*/
    /*!*z-index: 2;*!*/
    /*margin-left: 18px;*/

    position: absolute;
    display: flex;
    margin: 0;
    background: var(--bg-fill);
    left: var(--page-border-thickness);
    right: var(--page-border-thickness);
    bottom: var(--page-border-thickness);
    width: auto;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 16px;
    gap: 16px;
  }

  .project-nav a {
    margin-bottom: unset;
  }

  .pills {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
</style>
