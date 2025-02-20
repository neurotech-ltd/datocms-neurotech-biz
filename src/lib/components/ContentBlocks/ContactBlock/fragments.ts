import {graphql} from '$lib/datocms/graphql';

/**
 */

export const ContactBlockFragment = graphql(
  /* GraphQL */ `
        fragment ContactBlockFragment on ContactBlockRecord {
            ... on RecordInterface {
                id
                __typename
            }
            title
            description
        }
  `,
  [],
);
