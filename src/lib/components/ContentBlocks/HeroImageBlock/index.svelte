<script lang="ts">
  import {HeroImageBlockFragment} from "./fragments";
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';
  import ResponsiveImage from "../../ResponsiveImage/index.svelte";
  import { onMount } from 'svelte';
  interface Props {
    data: FragmentOf<typeof HeroImageBlockFragment>;
  }

  let {data}: Props = $props();

  let unmaskedBlock = $derived(readFragment(HeroImageBlockFragment, data));

  function updateStyles() {
    let focalPoint = unmaskedBlock.image.focalPoint;
    console.log(JSON.stringify(focalPoint, null, 4));
    let root = document.querySelector('.hero-image-block');
    root.style.setProperty('--focal-point-x', `${focalPoint.x * 100}%`);
    root.style.setProperty('--focal-point-y', `${focalPoint.y * 100}%`);
  }

  onMount(() => {
    // console.log('Project.onMount():  ', project.slug);
    updateStyles();
  });

</script>

<div class="hero-image-block">
    <ResponsiveImage data="{unmaskedBlock.image.responsiveImage}" imgClass="hero-image-control"></ResponsiveImage>
</div>

<style>
    .hero-image-block {
        width: 100%;
        min-height: 400px;
        max-height: 560px;
        --focal-point-x: 50%;
        --focal-point-y: 0%;
    }

    :global(.hero-image-block > picture > .hero-image-control) {
        max-height: 560px;
        /*
            Override the default behaviour of the ResponsiveImage src set styling.
            The srcSet sets a max-width, but i want images to fill the space regardless.
        */
        max-width: 100% !important;
        object-fit: cover;
        object-position: var(--focal-point-x) var(--focal-point-y);
    }
</style>
