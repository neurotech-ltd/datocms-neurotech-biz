<script lang="ts">
  import ResponsiveImage from '$lib/components/ResponsiveImage/index.svelte';
  import { type FragmentOf, readFragment } from '$lib/datocms/graphql';
  import { ImageByTextBlockFragment } from './fragments';

  interface Props {
    data: FragmentOf<typeof ImageByTextBlockFragment>;
  }

  let { data }: Props = $props();

  let unmaskedData = $derived(readFragment(ImageByTextBlockFragment, data));

  let isLandscapeImage = $derived(
    unmaskedData.asset.responsiveImage.width > unmaskedData.asset.responsiveImage.height,
  );
</script>

<div class="image-by-text {unmaskedData.isAlignedRight ? 'reverse' : ''}">
  <figure>
    <!-- Display responsive image -->
    <ResponsiveImage
      data={unmaskedData.asset.responsiveImage}
      imgClass={isLandscapeImage ? 'landscape' : ''}
    />
    <!-- Display image title -->
    <!--  <figcaption>{unmaskedData.asset.title}</figcaption>-->
  </figure>
  <div class="text">
    <p>{unmaskedData.copy}</p>
  </div>
</div>

<!--  Mobile first, Column layout -->
<style>
  .image-by-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 0 64px 0;
    align-items: center;
  }

  .image-by-text.reverse {
    flex-direction: column;
  }

  .image-by-text .text p {
    text-align: center;
    font-size: xx-large;
    margin-right: 1rem;
    margin-left: 1rem;
    padding: 0;
  }

  /* Mobile: Figure sits atop text with spacing and fills the width.*/
  .image-by-text > figure {
    margin-bottom: 18px;
    width: 100%;
  }

  .image-by-text.reverse .text {
    text-align: center !important;
  }

  /* Style the image figure. */
  .image-by-text figure {
    border-radius: 12px;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .text {
      text-align: left !important;
      font-size: xx-large !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      padding-left: 20px;
      padding-right: 20px;
      width: 50%;
    }

    .text p {
      max-width: 600px;
    }

    .image-by-text {
      flex-direction: row;
    }

    /*Desktop - figure should 50-50 split with text */
    .image-by-text > figure {
      margin: 0;
      width: 50%;
    }

    .image-by-text.reverse {
      flex-direction: row-reverse;
    }

    .image-by-text.reverse .text {
      text-align: left !important;
    }
  }
</style>
