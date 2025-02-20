import {graphql} from '$lib/datocms/graphql';

/**
 */

export const MapBlockFragment = graphql(
  /* GraphQL */ `
        fragment MapBlockFragment on MapBlockRecord {
            ... on RecordInterface {
                id
                __typename
            }
            title
            description
            location {
                latitude
                longitude
            }
        }
  `,
  [],
);
