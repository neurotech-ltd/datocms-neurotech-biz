<script lang="ts">
  import {Head, querySubscription, StructuredText} from '@datocms/svelte';

  import type {PageData} from './$types';
  import PageBloc from '../lib/components/PageBloc/index.svelte';
  import LayoutBloc from '../lib/components/LayoutBloc/index.svelte';

  import {onMount} from 'svelte';
  import {writable} from 'svelte/store';

  import ContentBlocks from "../lib/components/ContentBlocks/index.svelte";
  import TopNav from "../lib/components/TopNav/index.svelte";
  import NavigationBlock from "../lib/components/NavigationBlock/index.svelte";

  // Create a store to manage the visible state of sections
  export const pageState = writable({
    work: true,
    side_projects: false,
  });

  interface Props {
    data: PageData;
    isBrowser: bool;
  }

  let {data, isBrowser}: Props = $props();
  let subscription = $derived(querySubscription(data.subscription));
  let homepage = $derived($subscription.data?.homepage);
</script>

{#if homepage}
    <Head data={homepage._seoMetaTags}></Head>
    <PageBloc class="home-page" fixedPageWidth={false}>
        <LayoutBloc direction="column">
            <NavigationBlock data="{homepage.navigation}"></NavigationBlock>
            <ContentBlocks data="{homepage.content}">

            </ContentBlocks>
        </LayoutBloc>
    </PageBloc>
{/if}


<style lang="css">

</style>
