<script lang="ts">
  interface Props {
    direction?: string;
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let { direction = 'column', children, ...rest }: Props = $props();
</script>

<div class="page-bloc {rest.class} direction-{direction} ">
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
    .page-bloc {
      max-width: 1140px;
    }
  }
</style>
