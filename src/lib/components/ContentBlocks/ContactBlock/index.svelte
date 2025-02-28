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
        flex-direction: column;
        width: 100%;
        height: fit-content;
    }

    .contact-block-details {
        display: flex;
        flex-direction: column;
        flex: 1;
        flex-basis: 50%;
        align-content: center;
        justify-content: center;
        text-align: center;
        padding: var(--page-margin);
    }

    .contact-block-image {
        flex: 1;
        flex-basis: 50%;
        height: 100%;
        max-height: 300px;
    }

    :global(.contact-block  .contact-block-image-control) {
        /*need to sort out image sizing.*/
        /*height: 300px !important;*/
        /*max-height: 300px !important;*/
        height:100% !important;
        object-fit: cover !important;
    }
    :global(.contact-block-image > picture) {
        height:100%;
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

    @media (min-width: 1024px) {
        .contact-block {
            flex-direction: row;
        }
        .contact-block-image{
            max-height: unset;
        }
    }
</style>
