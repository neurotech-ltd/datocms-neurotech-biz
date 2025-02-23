<script lang="ts">
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';
  import {NavigationFragment} from './fragments';
  import ResponsiveImage from "../ResponsiveImage/index.svelte";

  interface Props {
    data: FragmentOf<typeof NavigationFragment>;
  }

  let {data}: Props = $props();

  let unmaskedBlock = $derived(readFragment(NavigationFragment, data));
</script>

<div class="navigation">

    <div class="navigation-logo">
        <ResponsiveImage data="{unmaskedBlock.logo.responsiveImage}"></ResponsiveImage>
    </div>
    <nav aria-label="Main Navigation" class="navigation-menu">
        <ul>
            {#each unmaskedBlock.menuItems as menuItem, i}
                <!--                <p>{JSON.stringify(menuItem, null, 4)}</p>-->
                <!-- TODO (emileswain) fix link building -->
                <li><a href={'/project/'+menuItem.link?.slug ?? ""} aria-label={menuItem.title}>{menuItem.title}</a>
                </li>
            {/each}
        </ul>
</div>

<style>
    .navigation {
        display: flex;
        flex-direction: column;
        min-height: 90px;
        padding: 18px;
        align-items: center;

        gap: 16px;
        /*background-color: #007bff;*/
    }

    @media (min-width: 1024px) {
        .navigation {
            flex-direction: row;
        }
    }

    .navigation-logo {
        max-width: 300px;
    }

    .navigation-menu {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .navigation-menu > ul {
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .navigation-menu > ul > li {
        padding-left: 8px;
        padding-right: 8px;
    }

    nav {
        flex-grow: 1;
    }
</style>
