<script lang="ts">
  import { render as structuredTextToPlainText } from 'datocms-structured-text-to-plain-text';
  import type { Heading } from 'datocms-structured-text-utils';

  // https://www.datocms.com/docs/structured-text/dast#heading
  interface Props {
    node: Heading;
    children?: import('svelte').Snippet;
  }

  let { node, children }: Props = $props();

  /**
   * Returns a slugified version of the string by converting the input to
   * lowercase, eliminating non-alphanumeric characters, and removing any hyphens
   * at the beginning or end of the string.
   */
  const slugify = (str: string | null) =>
    str
      ? str
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      : undefined;

  let as = $derived(`h${node.level}` as const);

  function containsLinkType(node) {
    if (node.children && node.children.length > 0) {
      return node.children.some((child) => child.type === 'link');
    }
    return false;
  }
  //
  let hasNestedLinks = $derived(containsLinkType(node));

  // console.log("node: ", node)
  // Convert the node to plain text, and then slugify
  let slug = $derived(slugify(structuredTextToPlainText(node)));
</script>

<!-- Renders a Structured Text heading node as an heading with anchor link. -->
{#if slug}
  <svelte:element this={as} id={slug} tabindex="-1">
    {#if hasNestedLinks}
      {@render children?.()}
    {:else}
      <!--            <a href={`#${slug}`}>-->
      {@render children?.()}
      <!--            </a>-->
    {/if}
  </svelte:element>
{:else}
  <svelte:element this={as}>
    {@render children?.()}
  </svelte:element>
{/if}
