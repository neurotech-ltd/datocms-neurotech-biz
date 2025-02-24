<script lang="ts">
  import {ProjectCardsBlockFragment} from "./fragments";
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';
  import ResponsiveImage from "../../ResponsiveImage/index.svelte";


  interface Props {
    data: FragmentOf<typeof ProjectCardsBlockFragment>;
  }

  let {data}: Props = $props();

  let unmaskedBlock = $derived(readFragment(ProjectCardsBlockFragment, data));
</script>

<div class="project-cards-block">
    <div class="project-cards-header">
        <h1>{unmaskedBlock.title}</h1>
        {#if unmaskedBlock.description }
            <p>{unmaskedBlock.description}</p>
        {/if}
    </div>
    <div class="project-cards-list">
        {#each unmaskedBlock.projects as project, i}
            <div class="project-card">
                <div class="project-card-image">
                    <ResponsiveImage data="{project.heroImage.responsiveImage}"
                                     imgClass="project-card-image-control"></ResponsiveImage>
                </div>
                <div class="project-card-details">
                    <h1>{project.title}</h1>
                    <p>{JSON.stringify(project.tagLine, null, 4)}</p>
                    <a href="/project/{project.slug}" rel="no-prefetch" aria-label={project.slug}> More</a>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    /* set default margins of content.*/
    .project-cards-block {
        display: flex;
        flex-direction: column;
    }

    .project-cards-header {
        display: flex;
        flex-direction: column;
        align-content: center;
        text-align: center;
        padding: var(--page-margin);
    }

    .project-cards-header h1 {
        margin-bottom: 0;
    }

    .project-cards-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-left: 32px;
        margin-right: 32px;
    }

    .project-card {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
        min-height: 520px;
        max-width: 300px;
    }

    @media (min-width: 1024px) {
        .project-card {
            flex-direction: column;
        }
    }

    .project-card-image {
        width: 300px;
        height: 300px;
        display: flex; /* Center the image within the div */
        justify-content: center;
        overflow: hidden;
    }

    :global(.project-card-image > picture){
        display: flex; /* This is really important otherwise it doesn't work. */
    }

    :global(.project-card-image .project-card-image-control) {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Ensures the image covers the entire area */
        display: block;
    }

    .project-card-details {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-content: center;
        justify-content: center;
        text-align: center;
        padding: var(--page-margin);
    }

    .project-card-details a {
        background-color: #1C346C;
        color: white;
        padding: 8px;
        padding-left: 16px;
        padding-right: 16px;
        width: fit-content;
        align-self: center;
    }

</style>
