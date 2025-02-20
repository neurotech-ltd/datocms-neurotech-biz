<script lang="ts">
  import { HeroImageBlockFragment} from "./fragments";
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';
  import ResponsiveImage from "../../ResponsiveImage/index.svelte";

  interface Props {
    data: FragmentOf<typeof HeroImageBlockFragment>;
  }

  let { data }: Props = $props();

  let unmaskedBlock = $derived(readFragment(HeroImageBlockFragment, data));
</script>

<div class="hero-image-block">
    <ResponsiveImage data="{unmaskedBlock.image.responsiveImage}"></ResponsiveImage>
</div>

<style>
    .hero-image-block {
        width: 100%;
        min-height: 400px;
    }
</style>
