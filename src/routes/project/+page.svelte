<script lang="ts">
  import {querySubscription} from '@datocms/svelte';
  import type {PageData} from './$types';

  interface Props {
    data: PageData;
    isBrowser: bool;
  }

  let {data, isBrowser}: Props = $props();
  // let subscription = $derived(querySubscription(data.subscription));
  // let projectPage = $derived($subscription.data?.homepage);


</script>


<div><h1>hello</h1></div>

<style lang="css">

</style>
