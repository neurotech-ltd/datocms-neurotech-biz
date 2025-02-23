<script lang="ts">
  interface Props {
    direction?: string;
    children?: import('svelte').Snippet;
    fixedPageWidth?:boolean
    [key: string]: any;
  }

  let {
    direction = 'column',
    children,
    fixedPageWidth=true,
    ...rest
  }: Props = $props();

</script>

<div class="page-bloc {rest.class} direction-{direction} " class:page-bloc-fixed-page-width={fixedPageWidth}>
    {@render children?.()}
</div>

<!--
    Fill page
-->
<style>
    .page-bloc {
        display: flex;
        flex: 1 1 0;
        gap: 0;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 130px;
        padding: 0;
        width: auto;
        height: max-content;
        /*Added to fix mobile x scroll issue when child content wider than page.*/
        max-width: 100vw;
    }

    .direction-column {
        flex-direction: column;
    }

    .direction-row {
        flex-direction: row;
    }

    @media (min-width: 768px) {
        .page-bloc {
            max-width: 100%;
        }
    }

    @media (min-width: 1140px) {
        .page-bloc-fixed-page-width {
            max-width: 1140px;
        }
    }
</style>
