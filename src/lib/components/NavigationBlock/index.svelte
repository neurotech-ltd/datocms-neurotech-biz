<script lang="ts">
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';
  import {NavigationFragment} from './fragments';
  import ResponsiveImage from "../ResponsiveImage/index.svelte";
  import Link from "../Link/index.svelte";

  interface Props {
    data: FragmentOf<typeof NavigationFragment>;
  }

  let {data}: Props = $props();
  let unmaskedBlock = $derived(readFragment(NavigationFragment, data));

  function parseLinkPath(link) {
    try {
      console.log("=== " + link);
      switch (link.__typename) {
        case "PageRecord":
          return `/${link.slug}`;
        case "ProjectRecord":
          return `/project/${link.slug}`;
        default:
          return "";
      }
    } catch (e) {
      return "/";
    }
  }

</script>

<div class="navigation">
    <a class="navigation-logo" href="/">
        <div >
            <ResponsiveImage data="{unmaskedBlock.logo.responsiveImage}"></ResponsiveImage>
        </div>
    </a>
    <nav aria-label="Main" class="navigation-menu">
        <ul>
            {#each unmaskedBlock.menuItems as menuItem, i}
                <!--                <p>{JSON.stringify(menuItem, null, 4)}</p>-->
                <!-- TODO (emileswain) fix link building -->
                <li>
                    <a href={parseLinkPath(menuItem.link)} aria-label={menuItem.title}>{menuItem.title}</a>
                    <!--                    <Link href={parseLinkPath(menuItem.link)} aria-label={menuItem.title}>{menuItem.title}</Link>-->
                </li>
            {/each}
        </ul>
    </nav>
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
        margin-bottom: 0;
        /*  overrides a link having default bottom margin.  */
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
