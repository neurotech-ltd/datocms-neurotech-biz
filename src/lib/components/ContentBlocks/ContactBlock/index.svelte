<script lang="ts">
  import {ContactBlockFragment} from "./fragments";
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';
  import ResponsiveImage from "../../ResponsiveImage/index.svelte";

  interface Props {
    data: FragmentOf<typeof ContactBlockFragment>;
  }

  let {data}: Props = $props();

  let unmaskedBlock = $derived(readFragment(ContactBlockFragment, data));
</script>

<div class="contact-block on_dark">
    <div class="contact-block-image">
        <ResponsiveImage data="{unmaskedBlock.image.responsiveImage}"
                         imgClass="contact-block-image-control"></ResponsiveImage>
    </div>

    <div class="contact-block-details">
        <h1>{unmaskedBlock.title}</h1>
        <p>{unmaskedBlock.description}</p>
    </div>

</div>

<style>
    /* set default margins of content.*/
    .contact-block {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: fit-content;
    }

    .contact-block-details {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-content: center;
        justify-content: center;
        text-align: center;
        padding: var(--page-margin);
    }

    .contact-block-image {
        flex: 1;
        height: 100%;
    }

    :global(.contact-block  .contact-block-image-control) {
        /*need to sort out image sizing.*/
        height: 550px !important;
        max-height: 560px !important;
        object-fit: cover !important;
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
