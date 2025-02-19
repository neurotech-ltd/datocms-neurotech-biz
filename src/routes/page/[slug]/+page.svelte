<script lang="ts">
  import { Head, querySubscription } from '@datocms/svelte';

  import type { PageData } from './$types';
  import LayoutBloc from '../../../lib/components/LayoutBloc/index.svelte';
  import ContentBloc from '../../../lib/components/BlockLayout/ContentBloc/index.svelte';
  import PageBloc from '../../../lib/components/PageBloc/index.svelte';
  import TopNav from '../../../lib/components/TopNav/index.svelte';
  import Icon from '../../../lib/components/Icon/index.svelte';
  import BlockLayout from '../../../lib/components/BlockLayout/index.svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  let subscription = $derived(querySubscription(data.subscription));
  let page = $derived($subscription.data?.page);
</script>

{#if page}
  <!--
      The <Head> component provided by @datocms/svelte automates the creation of
      meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
    -->
  <!--    <Head data={page._seoMetaTags}>-->
  <!--        <title></title>-->
  <!--    </Head>-->

  <PageBloc class="article-page">
    <TopNav>
      <a href="/" rel="no-prefetch" aria-label="home">
        <Icon type="home" />
      </a>
    </TopNav>
    <LayoutBloc>
      <ContentBloc>
        <h1>{page.title}</h1>
        <p>{page.shortDescription}</p>
      </ContentBloc>
      <LayoutBloc direction="column">
        {#each page.content as content, i}
          <BlockLayout data={content} />
        {/each}
      </LayoutBloc>
    </LayoutBloc>
  </PageBloc>
{/if}

<style lang="css">
</style>
