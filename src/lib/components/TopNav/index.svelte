<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="top-nav">
  {@render children?.()}
</div>

<style>
  .top-nav {
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: var(--bloc-margin-bottom);
    padding: 8px;
    width: inherit;
    height: fit-content;
    min-height: 90px;
    align-content: flex-start;
  }
</style>
