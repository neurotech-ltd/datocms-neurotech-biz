<script lang="ts">
  import ResponsiveImage from '../ResponsiveImage/index.svelte';
  import { ResponsiveImageFragment } from '../ResponsiveImage/fragments';
  import { readFragment } from '../../datocms/graphql';

  interface Props {
    data: any;
    shredded: boolean;
    showCaption: boolean;
    width: number;
    height: number;
    [key: string]: any;
  }

  let {
    data,
    shredded = false,
    showCaption = false,
    width = 460,
    height = 259,
    ...rest
  }: Props = $props();
  let unmaskedData = $derived(readFragment(ResponsiveImageFragment, data));
  let caption = $derived(unmaskedData.title);
</script>

<figure class="figure" class:shredded style:width={width + 'px'} style:height={height + 'px'}>
  <ResponsiveImage {data} imgStyle="width:{width};height:{height}" />
  {#if caption}
    <figcaption class:caption-hidden={!showCaption}>{caption}</figcaption>
  {/if}
  {#if shredded}
    <div class="blurBox"></div>
  {/if}
</figure>

<style lang="css">
  .figure {
    display: flex;
    position: relative;
    max-width: 460px;
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
  }

  /* Add for screen readers but hide from design.
    Check that alt text isn't sufficent. */
  .caption-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .blurBox {
    position: absolute;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
    left: calc(var(--bar-start) * 1%);
    right: 0;
    top: 0;
    bottom: 0;
    --blur-width: calc(var(--bar-width) / (var(--blur-start) / 100));
    mask-image: repeating-linear-gradient(
      to right,
      transparent 0,
      transparent calc(var(--blur-width) * 1%),
      black calc(var(--blur-width) * 1%),
      black calc((var(--blur-width) * 2) * 1%)
    );
  }

  .shredded {
  }

  /*overrides the styling added by the graphql query? confused.*/
  :global(figure > picture > img) {
    width: 100%;
    height: auto;
  }

  /*I don't think i need first-child anymore.*/
  :global(.figure.shredded > picture:first-child) {
    width: 100% !important;
    height: unset !important;
    filter: unset !important;
    margin-left: unset !important;
    /*--bar-width: 4;
                --bar-start: 60;*/
    mask-image: linear-gradient(
        to right,
        black 0%,
        black calc(var(--bar-start) * 1%),
        transparent calc(var(--bar-start) * 1%),
        transparent 100%
      ),
      repeating-linear-gradient(
        to right,
        transparent calc(var(--bar-start) * 1%),
        transparent calc((var(--bar-start) + var(--bar-width)) * 1%),
        black calc((var(--bar-start) + var(--bar-width)) * 1%),
        black calc((var(--bar-start) + var(--bar-width) * 2) * 1%)
      );
    mask-size: 100%;
  }
</style>
