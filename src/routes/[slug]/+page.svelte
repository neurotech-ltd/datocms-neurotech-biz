<script lang="ts">
  import {querySubscription} from '@datocms/svelte';

  import type {PageData} from './$types';
  import PageBloc from "../../lib/components/PageBloc/index.svelte";
  import LayoutBloc from "../../lib/components/LayoutBloc/index.svelte";
  import NavigationBlock from "../../lib/components/NavigationBlock/index.svelte";
  import ContentBlocks from "../../lib/components/ContentBlocks/index.svelte";
  import ContentBlock from "../../lib/components/ContentBlocks/ContentBlock/index.svelte";
  import Link from "../../lib/components/Link/index.svelte";

  interface Props {
    data: PageData;
    isBrowser: bool;
  }

  let {data, isBrowser}: Props = $props();
  let subscription = $derived(querySubscription(data.subscription));
  let page = $derived($subscription.data?.page);

</script>

{#if page}
    <PageBloc class="projects-page" fixedPageWidth={false}>
        <LayoutBloc direction="column">
            <NavigationBlock data="{page.navigation}"></NavigationBlock>
            <ContentBlocks data="{page.content}">

            </ContentBlocks>
        </LayoutBloc>
    </PageBloc>
{/if}


<style lang="css">
    .projects-page {

    }
</style>
