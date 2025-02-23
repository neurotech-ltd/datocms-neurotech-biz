<script lang="ts">
  import {  querySubscription } from '@datocms/svelte';

  import type { PageData } from './$types';
  import LayoutBloc from '../../../lib/components/LayoutBloc/index.svelte';
  import PageBloc from '../../../lib/components/PageBloc/index.svelte';
  import ContentBlocks from "../../../lib/components/ContentBlocks/index.svelte";


  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  let subscription = $derived(querySubscription(data.subscription));
  let page = $derived($subscription.data?.page);
</script>

{#if page}

  <PageBloc class="project-page" fixedPageWidth={false}>
    <LayoutBloc direction="column" grow="1">
<!--      <NavigationBlock data="{project.navigation}"></NavigationBlock>-->
      <ContentBlocks data="{page.content}">

      </ContentBlocks>
    </LayoutBloc>
  </PageBloc>
{/if}

<style lang="css">
</style>
