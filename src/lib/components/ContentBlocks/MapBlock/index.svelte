<script lang="ts">
  import { MapBlockFragment} from "./fragments";
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';

  // https://stackoverflow.com/questions/42457368/google-maps-night-mode-embed-iframe
  // https://developers.google.com/maps/documentation/embed/get-started
  // https://developers.google.com/maps/documentation/javascript/examples/style-array#maps_style_array-html
  interface Props {
    data: FragmentOf<typeof MapBlockFragment>;
  }

  let { data }: Props = $props();

  let unmaskedBlock = $derived(readFragment(MapBlockFragment, data));
</script>

<div class="map-block">
    <h1>{unmaskedBlock.title}</h1>
    <p>{unmaskedBlock.description}</p>
<!--    <p>lat/lng: {unmaskedBlock.location}</p>-->
    <iframe src = "https://maps.google.com/maps?q={unmaskedBlock.location.latitude},{unmaskedBlock.location.longitude}&hl=es;z=14&amp;output=embed" width="100%" height="270" frameborder="0" style="border:0;" ></iframe>
</div>

<style>
    /* set default margins of content.*/
    .map-block {
        width: 100%;
    }

</style>
