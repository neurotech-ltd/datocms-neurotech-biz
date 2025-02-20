<script lang="ts">
  import {ContactBlockFragment} from "./fragments";
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';

  interface Props {
    data: FragmentOf<typeof ContactBlockFragment>;
  }

  let { data }: Props = $props();

  let unmaskedBlock = $derived(readFragment(ContactBlockFragment, data));
</script>

<div class="contact-block">
    <h1>{unmaskedBlock.title}</h1>
    <p>{unmaskedBlock.description}</p>

</div>

<style>
    /* set default margins of content.*/
    .contact-block {
        /*background-color: pink;*/
    }

</style>
