import {graphql} from '$lib/datocms/graphql';

/**
 */

export const TeamBlockFragment = graphql(
  /* GraphQL */ `
        fragment TeamBlockFragment on TeamBlockRecord {
            ... on RecordInterface {
                id
                __typename
            }
            title
            members {
                name
                role
                image {
                    url
                }
            }
            partners {
                name
                role
            }
        }
  `,
  [],
);
