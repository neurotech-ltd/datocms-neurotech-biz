<script lang="ts">
  import {ProjectsBlockFragment} from "./fragments";
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';

  interface Props {
    data: FragmentOf<typeof ProjectsBlockFragment>;
  }

  let { data }: Props = $props();

  let unmaskedBlock = $derived(readFragment(ProjectsBlockFragment, data));
</script>

<div class="projects-block">
    <h1>{unmaskedBlock.title}</h1>
    <p>{unmaskedBlock.description}</p>
    <div class="projects">
        {#each unmaskedBlock.projects as project, i}
            <div class="project">
                <span>{project.title}</span> ~ <span>{project.description}</span>
            </div>
        {/each}
    </div>
</div>

<style>
    /* set default margins of content.*/
    .projects-block {
        /*background-color: pink;*/
    }
    .projects{

    }
    .project{

    }
</style>
