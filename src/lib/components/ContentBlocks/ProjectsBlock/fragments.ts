import {graphql} from '$lib/datocms/graphql';

/**
 */

export const ProjectsBlockFragment = graphql(
  /* GraphQL */ `
        fragment ProjectsBlockFragment on ProjectsBlockRecord {
            ... on RecordInterface {
                id
                __typename
            }
            title
            projects{
                title
                slug
            }
        }
  `,
  [],
);
