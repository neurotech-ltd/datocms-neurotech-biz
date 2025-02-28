<script lang="ts">
  import {Head, querySubscription} from '@datocms/svelte';
  import PageBloc from "../../../lib/components/PageBloc/index.svelte";
  import LayoutBloc from "../../../lib/components/LayoutBloc/index.svelte";
  import NavigationBlock from "../../../lib/components/NavigationBlock/index.svelte";
  import ContentBlocks from "../../../lib/components/ContentBlocks/index.svelte";

  let {data, isBrowser}: Props = $props();
  let subscription = $derived(querySubscription(data.subscription));
  let project = $derived($subscription.data?.project);

</script>

{#if project}
    <Head data={project._seoMetaTags}></Head>
    <PageBloc class="project-page" fixedPageWidth={false}>
        <LayoutBloc direction="column" grow="1">
            <NavigationBlock data="{project.navigation}"></NavigationBlock>
            <ContentBlocks data="{project.content}">

            </ContentBlocks>
        </LayoutBloc>
    </PageBloc>
{/if}

<style lang="css">

</style>
