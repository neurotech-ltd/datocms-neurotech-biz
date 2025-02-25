import {graphql} from '$lib/datocms/graphql';
import {ResponsiveImageFragment} from "../../ResponsiveImage/fragments";

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
                pronouns
                description
                image {
                    responsiveImage{
                        ... ResponsiveImageFragment
                    }
                    focalPoint {
                        x
                        y
                    }
                }
            }
            partners {
                name
                role
            }
        }
  `,
  [ResponsiveImageFragment],
);
