<script lang="ts">
  import {FooterBlockFragment,} from "./fragments";
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';
  import {marked} from 'marked';

  interface Props {
    data: FragmentOf<typeof FooterBlockFragment>;
  }

  let {data}: Props = $props();

  let unmaskedBlock = $derived(readFragment(FooterBlockFragment, data));
</script>

<div class="footer-block">
    <div class="footer-content on_dark">
        {@html marked(unmaskedBlock.description)}
    </div>
</div>

<style>
    .footer-block {
        width: 100%;
        min-height: 160px;
        background-color: #1C346C;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    :global(.footer-content p) {

    }

    .on_dark {
        --text-color: #FFFFFF;
    }
</style>
