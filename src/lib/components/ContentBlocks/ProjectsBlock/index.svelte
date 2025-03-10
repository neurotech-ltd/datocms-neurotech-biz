<script lang="ts">
  import {ProjectsBlockFragment} from "./fragments";
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';
  import ResponsiveImage from "../../ResponsiveImage/index.svelte";
  import Button from "../../Button/index.svelte";
  import Link from "../../Link/index.svelte";

  interface Props {
    data: FragmentOf<typeof ProjectsBlockFragment>;
  }

  let {data}: Props = $props();

  let unmaskedBlock = $derived(readFragment(ProjectsBlockFragment, data));
</script>

<div class="projects-block">
    <div class="project-header">
        <h1>{unmaskedBlock.title}</h1>
        {#if unmaskedBlock.description }
            <p>{unmaskedBlock.description}</p>
        {/if}
    </div>
    <div class="project-list">
        {#each unmaskedBlock.projects as project, i}
            <div class="project on_light">
                <div class="project-details">
                    <h1>{project.title}</h1>
                    <p>{JSON.stringify(project.description, null, 4)}</p>
                    <Link href="/project/{project.slug}" rel="no-prefetch" aria-label="{project.slug}">More</Link>
                </div>
                <div class="project-image">
                    <ResponsiveImage data="{project.heroImage.responsiveImage}"
                                     imgClass="project-image-control"></ResponsiveImage>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    /* set default margins of content.*/
    .projects-block {
        display: flex;
        flex-direction: column;
    }

    .project-header {
        display: flex;
        flex-direction: column;
        align-content: center;
        text-align: center;
        padding: var(--page-margin);
    }

    .project-header h1 {
        margin-bottom: 0;
    }

    .project-list {
        display: flex;
        flex-direction: column;
    }

    .project {
        display: flex;
        flex-direction: column-reverse;
        margin-bottom: 16px;
        min-height: 520px;

    }

    @media (min-width: 1024px) {
        .project {
            flex-direction: row;
        }
    }

    .project-image {
        flex: 1;
        height: 100%;
        flex-basis: 50%;
    }

    :global(.project-image .project-image-control) {
        /*need to sort out image sizing.*/
        height: 300px !important;
        max-height: 300px !important;
        object-fit: cover !important;
    }
    @media (min-width: 1024px) {
        :global(.project-image .project-image-control) {
            /*need to sort out image sizing.*/
            height: 550px !important;
            max-height: 560px !important;
            object-fit: cover !important;
        }
    }

    .project-details {
        display: flex;
        flex-direction: column;
        flex: 1;
        flex-basis: 50%;
        align-content: center;
        justify-content: center;
        text-align: center;
        padding: var(--page-margin);
    }

    .project-details a {
        background-color: #1C346C;
        color: white;
        padding: 8px;
        padding-left: 16px;
        padding-right: 16px;
        width: fit-content;
        align-self: center;
    }

    .on_light {
        /*    Dark text on light background */
        background-color: #eaeaea;
        --text-color: #1C346C;
    }

    .on_dark {
        background-color: #1C346C;
        --text-color: white;
    }
</style>
