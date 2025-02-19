<!-- https://stackoverflow.com/questions/66069647/best-way-to-import-svg-icons-into-a-svelte-app-->
<!-- https://stackoverflow.com/questions/71789244/where-to-put-images-with-sveltekit-->
<!-- https://stackoverflow.com/questions/67337435/how-to-config-for-using-svg-file-in-sveltekit-->

<script lang="ts">
  interface Props {
    type: any;
  }

  let { type }: Props = $props();

  let svgContent = $state();

  // Dynamically import the SVG based on the type prop
  import(`../../images/icons/${type}.svg?raw`)
    .then((module) => {
      svgContent = module.default;
    })
    .catch((error) => {
      console.error('Error loading SVG:', error);
      svgContent = '';
    });
</script>

{#if svgContent}
  <div>{@html svgContent}</div>
{/if}

<style>
  :global(svg) {
    width: 35px;
    height: 35px;
  }

  :global(svg path) {
    fill: var(--icon-fill); /* Change to your desired color */
    stroke: var(--icon-color); /* Change to your desired color */
  }
</style>
