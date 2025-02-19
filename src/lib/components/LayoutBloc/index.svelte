<script lang="ts">
  interface Props {
    direction?: string;
    collapseRow?: boolean;
    alternateDirection?: boolean;
    children?: import('svelte').Snippet;
    shrink?: number;
    grow?: number;

    [key: string]: any;
  }

  let {
    direction = 'column',
    collapseRow = false,
    alternateDirection = false,
    shrink = 'unset',
    grow = 'unset',
    children,
    ...rest
  }: Props = $props();
</script>

<div
  class="layout-bloc {direction} {alternateDirection ? 'alternate-direction' : ''} {collapseRow
    ? 'wrap-settings'
    : ''}  "
  {...rest}
  style:flex-shrink={shrink}
  style:flex-grow={grow}
>
  {@render children?.()}
</div>

<!--
    Used within PageBloc and nested within itself.
    Manages layout of child elements.
-->
<style>
  .layout-bloc {
    display: flex;
    flex: 1 1 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .column {
    flex-direction: column;
  }

  .row {
    flex-direction: row;
  }

  @media (min-width: 992px) {
    .alternate-direction:nth-child(odd) {
      align-items: flex-start; /* Default alignment */
    }

    .alternate-direction:nth-child(even) {
      flex-direction: row-reverse; /* Reverse the order of child items */
      align-items: flex-start; /* Align to the right */
    }
  }

  /**
      On mobile, we can define if we want row elements to switch to column when not enough space.
       */
  .wrap-settings {
    flex-direction: column;
  }

  @media (min-width: 500px) {
    .wrap-settings {
      flex-direction: column;
    }
  }

  @media (min-width: 768px) {
    .wrap-settings {
      flex-direction: column;
    }
  }

  @media (min-width: 992px) {
    .wrap-settings {
      flex-direction: row;
    }
  }

  @media (min-width: 1200px) {
    .wrap-settings {
      flex-direction: row;
    }
  }
</style>
