<script lang="ts">
  import {MapBlockFragment} from "./fragments";
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';

  // https://stackoverflow.com/questions/42457368/google-maps-night-mode-embed-iframe
  // https://developers.google.com/maps/documentation/embed/get-started
  // https://developers.google.com/maps/documentation/javascript/examples/style-array#maps_style_array-html
  interface Props {
    data: FragmentOf<typeof MapBlockFragment>;
  }

  let {data}: Props = $props();

  let unmaskedBlock = $derived(readFragment(MapBlockFragment, data));
</script>

<div class="map-block">
    <div class="map-block-header">
        <h1>{unmaskedBlock.title}</h1>
    </div>
    <div class="map-block-content">
        {#if unmaskedBlock.description}
            <div class="map-details">
                <!--        <h1>{unmaskedBlock.title}</h1>-->
                <p>{unmaskedBlock.description}</p>
            </div>
        {/if}
        <div class="map">
            <iframe src="https://maps.google.com/maps?q={unmaskedBlock.location.latitude},{unmaskedBlock.location.longitude}&hl=es;z=14&amp;output=embed"
                    width="100%" height="270" frameborder="0" style="border:0;"></iframe>

        </div>
    </div>
</div>

<style>
    /* set default margins of content.*/
    .map-block {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .map-block-header {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        padding: var(--page-margin);
    }

    .map-block-content {
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .map-details {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .map {
        flex: 1;
    }

</style>
