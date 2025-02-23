<script lang="ts">
  // Note when rendering description field which is multiline textfield in datocms
  // https://stackoverflow.com/questions/62678330/how-do-i-render-datocms-markdown-text-using-wysiwyg


  import {FooterBlockFragment,} from "./fragments";
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';


  interface Props {
    data: FragmentOf<typeof FooterBlockFragment>;
  }

  let {data}: Props = $props();

  let unmaskedBlock = $derived(readFragment(FooterBlockFragment, data));
</script>

<div class="footer-block">
    <div class="footer-content">
        <p>{unmaskedBlock.description}</p>
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

    .footer-content p {
        color: white;
        white-space: pre-line

    }
</style>
