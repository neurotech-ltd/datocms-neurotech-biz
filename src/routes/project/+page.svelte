<script lang="ts">
  import {Head, querySubscription} from '@datocms/svelte';

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
<!--
Note, that currently working on structure of datocms data and routes. Hence we have
/project and /projects which essentially does the same thing, where /projects is rendered
by /[slug]/page.svelte and /project is rendered by /projects/page.svelte.

Will probably refactor as this route /src/routes/project would conflict with the /src/routes/[slug] where project is
an endpoint. I.e. if you create a page in the csm ith the slug project does it override this page.svelte???
-->
{#if page}
    <Head data={page._seoMetaTags}></Head>
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
