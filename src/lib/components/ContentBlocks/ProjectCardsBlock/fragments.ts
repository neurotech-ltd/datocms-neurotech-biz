import {graphql} from '$lib/datocms/graphql';
import {ResponsiveImageFragment} from "../../ResponsiveImage/fragments";

/**
 */

export const ProjectCardsBlockFragment = graphql(
  /* GraphQL */ `
        fragment ProjectCardsBlockFragment on ProjectCardsBlockRecord {
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
