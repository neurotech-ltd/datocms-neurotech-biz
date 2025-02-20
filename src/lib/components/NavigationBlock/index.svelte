<script lang="ts">
  import { readFragment, type FragmentOf } from '$lib/datocms/graphql';
  import { NavigationFragment} from './fragments';
  import ResponsiveImage from "../ResponsiveImage/index.svelte";

  interface Props {
    data: FragmentOf<typeof NavigationFragment>;
  }

  let { data }: Props = $props();

  let unmaskedBlock = $derived(readFragment(NavigationFragment, data));
</script>

<div class="navigation">
<!--  <p>{JSON.stringify(unmaskedBlock, null, 4)}</p>-->
  <div class="navigation-logo">
    <ResponsiveImage data="{unmaskedBlock.logo.responsiveImage}"></ResponsiveImage>
  </div>
  <nav aria-label="Main Navigation">
    <ul style="list-style-type:none; display:flex; justify-content:space-around;">
      {#each unmaskedBlock.menuItems as menuItem, i}
        <li><a href="{menuItem.link}" aria-label="{menuItem.title}">{menuItem.title}</a></li>
      {/each}
    </ul>
</div>

<style>
  .navigation{
    display: flex;
    flex-direction: row;
    min-height: 90px;
    /*background-color: #007bff;*/
  }

  .navigation-logo
  {
    max-width: 300px;
  }
  nav{
    flex-grow: 1;
  }
</style>
