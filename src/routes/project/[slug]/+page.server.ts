import { TagFragment } from '$lib/datocms/commonFragments';
import { graphql } from '$lib/datocms/graphql';
import { generateRealtimeSubscription } from '$lib/datocms/queries';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ResponsiveImageFragment } from '$lib/components/ResponsiveImage/fragments';
import { BlockLayoutFragment } from '$lib//components/BlockLayout/fragments';

/**
 * The GraphQL query that will be executed for this route to generate the page
 * content and metadata.
 *
 * Thanks to gql.tada, the result will be fully typed!
 */
const query = graphql(
  /* GraphQL */ `
    query ProjectQuery($slug: String!) {
      project(filter: { slug: { eq: $slug } }) {
        _seoMetaTags {
          ...TagFragment
        }
        title
        slug
        client
        bgBorder {
          hex
        }
        bgFill {
          hex
        }
        featurePills
        content {
          ...BlockLayoutFragment
        }
        clientTextFill {
          hex
        }
        heroImage {
          responsiveImage {
            ...ResponsiveImageFragment
          }
        }
        _firstPublishedAt
      }
      allProjects {
        slug
      }
    }
  `,
  [TagFragment, ResponsiveImageFragment, BlockLayoutFragment],
);

/**
 * Executes the query, and returns the result as initialData for potential
 * subscription to the Real-time Updates API (only if the visitor has Draft Mode
 * active)
 */
export const load: PageServerLoad = async (event) => {
  // console.log(`PageServerLoad (event ) ${JSON.stringify(event, null, 4)}`);
  const subscription = await generateRealtimeSubscription(event, query, {
    slug: event.params.slug,
  });

  // console.log(JSON.stringify(query,null, 4));

  // console.log(`Load: ${subscription.initialData?.homepage?.title}}`)
  if (!subscription.initialData?.project) {
    error(404, 'Project not found');
  }

  return { subscription };
};
