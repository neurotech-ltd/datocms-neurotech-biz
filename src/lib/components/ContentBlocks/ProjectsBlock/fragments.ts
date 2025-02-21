import {graphql} from '$lib/datocms/graphql';
import {ResponsiveImageFragment} from "../../ResponsiveImage/fragments";

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
                tagLine
                description
                heroImage{
                    responsiveImage{
                        ...ResponsiveImageFragment
                    }
                }
                slug
            }
        }
  `,
  [ResponsiveImageFragment],
);
