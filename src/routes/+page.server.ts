import {InlineItemFragment} from '$lib/components/InlineItem/fragments';
import {ItemLinkFragment} from '$lib/components/ItemLink/fragments';
import {TagFragment} from '$lib/datocms/commonFragments';
import {graphql} from '$lib/datocms/graphql';
import {generateRealtimeSubscription} from '$lib/datocms/queries';
import {error} from '@sveltejs/kit';
import type {PageServerLoad} from './$types';
import {ImageBlockFragment} from '$lib/components/Block/ImageBlock/fragments';
import {ContentBlocksFragment} from '../lib/components/ContentBlocks/fragments';

import {browser} from '$app/environment';
import {NavigationFragment} from "../lib/components/NavigationBlock/fragments";

/**
 * The GraphQL query that will be executed for this route to generate the page
 * content and metadata.
 *
 * Thanks to gql.tada, the result will be fully typed!
 */
const query = graphql(
  /* GraphQL */ `
        query PageQuery {
            homepage {
                _seoMetaTags {
                    ...TagFragment
                }
                title
                profileImage {
                    alt
                    responsiveImage {
                        src
                    }
                }
                navigation{
                    ...NavigationFragment
                }
                _firstPublishedAt
                content{
                    ...ContentBlocksFragment
                }
                pages {
                    title
                    slug
                }
            }
        }
  `,
  [
    TagFragment,
    ItemLinkFragment,
    InlineItemFragment,
    ImageBlockFragment,
    ContentBlocksFragment,
    NavigationFragment,
  ],
);

/**
 * Executes the query, and returns the result as initialData for potential
 * subscription to the Real-time Updates API (only if the visitor has Draft Mode
 * active)
 */
export const load: PageServerLoad = async (event) => {
  const subscription = await generateRealtimeSubscription(event, query);
  // console.log(`Load: ${subscription.initialData?.homepage?.title}}`)
  if (!subscription.initialData?.homepage) {
    error(404, 'Page not found');
  }

  return {subscription, props: {isBrowser: browser}};
};
