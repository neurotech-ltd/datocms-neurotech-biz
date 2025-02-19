<script lang="ts">
  import { Head, querySubscription, StructuredText } from '@datocms/svelte';
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
  import type { PageData } from './$types';
  import PageBloc from '../lib/components/PageBloc/index.svelte';
  import LayoutBloc from '../lib/components/LayoutBloc/index.svelte';
  import ContentBloc from '../lib/components/BlockLayout/ContentBloc/index.svelte';
  import Link from '../lib/components/Link/index.svelte';
  import SectionBlock from '../lib/components/BlockLayout/SectionBlock/index.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // Create a store to manage the visible state of sections
  export const pageState = writable({
    work: true,
    side_projects: false,
  });

  interface Props {
    data: PageData;
    isBrowser: bool;
  }

  let { data, isBrowser }: Props = $props();
  let subscription = $derived(querySubscription(data.subscription));
  let homepage = $derived($subscription.data?.homepage);
  let projects = $derived($subscription.data?.homepage.projects);
  let pages = $derived([{ title: 'work' }, { title: 'projects' }, { title: 'other' }]);

  onMount(() => {
    if (isBrowser) {
      console.log('This code is running in the browser.');
    } else {
      console.log('This code is running on the server.');
    }

    // Initialize the first tab as active
    document.addEventListener('DOMContentLoaded', () => {
      showSection('section1');
    });
  });

  function showSection(sectionId) {
    pageState.update((state) => {
      // return {...state, [sectionId]: !state[sectionId]};
      return {
        work: sectionId == 'work',
        side_projects: sectionId == 'side_projects',
      };
    });
  }
</script>

{#if homepage}
  <!--  <TopNav>Emile swain</TopNav>-->
  <PageBloc class="home-page">
    <LayoutBloc>
      <LayoutBloc direction="row" collapseRow="true">
        <ContentBloc numberWang="0" useMaxWidth="true">
          <img
            class="profile-image fade-in"
            src={homepage.profileImage.responsiveImage.src}
            alt={homepage.profileImage.alt ?? 'profile image'}
          />
        </ContentBloc>
        <ContentBloc numberWang="0" useMaxWidth="true" align="bottom">
          <StructuredText
            data={homepage.structuredText}
            components={[
              [isCode, Code],
              [isHeading, HeadingWithAnchorLink],
              [isBlock, Block],
              [isInlineItem, InlineItem],
              [isItemLink, ItemLink],
            ]}
          />
        </ContentBloc>
      </LayoutBloc>
      <LayoutBloc>
        <ContentBloc>
          <LayoutBloc direction="row" grow="0">
            <button
              id="work"
              class="tab-button"
              class:active={$pageState.work}
              onclick={() => showSection('work')}
              >Work
            </button>
            <button
              id="side_projects"
              class="tab-button"
              class:active={$pageState.side_projects}
              onclick={() => showSection('side_projects')}
            >
              Projects
            </button>
          </LayoutBloc>
        </ContentBloc>
      </LayoutBloc>
      <SectionBlock title="Work" id="work" active={$pageState.work} showHeader={false}>
        <LayoutBloc>
          {#if projects}
            {#each projects as project, i}
              <LayoutBloc direction="row" alternateDirection="true" collapseRow="true">
                <ContentBloc numberWang={i + 1}>
                  <img
                    class="project-image"
                    src={project.heroImage.responsiveImage.src}
                    alt={project.heroImage.alt ?? 'image of project'}
                  />
                </ContentBloc>
                <ContentBloc numberWang={i + 1} useMaxWidth="true">
                  <h1>{project.title}</h1>
                  <StructuredText data={project.shortDescription} />
                  <Link href="/project/{project.slug}" rel="no-prefetch">Explore</Link>
                </ContentBloc>
              </LayoutBloc>
            {/each}
          {:else}
            <p>Loading projects...</p>
          {/if}
        </LayoutBloc>
      </SectionBlock>
      <SectionBlock
        title="Side Projects"
        id="side_projects"
        active={$pageState.side_projects}
        showHeader={false}
      >
        <LayoutBloc>
          {#each homepage.pages as page, i}
            <ContentBloc>
              <h1>{page.title}</h1>
              <StructuredText data={page.shortDescription} />
              <Link href="/page/{page.slug}" rel="no-prefetch">Explore</Link>
            </ContentBloc>
          {/each}
        </LayoutBloc>
      </SectionBlock>
    </LayoutBloc>
  </PageBloc>
{/if}

<style lang="css">
  /* global required to override the class properties that are applied to the PageBloc */
  :global(.container) {
    /*height: 100%;*/
    /*overflow-y: auto;*/
    /*min-height: 100vh;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    background: radial-gradient(circle at top left, white, rgb(176, 196, 185));
  }

  .profile-image {
    max-width: 100%;
    max-height: 100%;
  }

  @media (min-width: 700px) {
    .profile-image {
      max-width: 512px;
      max-height: 512px;
    }
  }

  .project-image {
    width: 100%;
    height: 263px;

    border-radius: 28px;
    border: 3px solid white;
    display: block;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    object-fit: cover;
  }

  /*:global(.flush) > img*/
  /*{*/
  /*    border:unset;*/
  /*    border-radius: 0;*/
  /*}*/

  @media (min-width: 700px) {
    .project-image {
      width: 460px;
      height: 263px;
    }
  }

  button {
    font-size: 2em; /* Adjust size to match your h1 */
    font-weight: 100;
    background: none;
    border: none;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-decoration-color: var(--txt-btn-color-stroke);
    color: var(--txt-btn-color-fill); /* Inherit the color from parent elements */
    cursor: pointer; /* Change cursor to pointer to indicate it's clickable */
    margin-right: 8px;
  }

  button:hover {
    color: var(--txt-btn-color-fill--hover);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-decoration-color: var(--txt-btn-color-stroke--hover); /* Change underline color on hover */
  }

  button:focus {
    outline: none; /* Remove focus outline */
  }
</style>
