import {graphql} from '$lib/datocms/graphql';
import {ResponsiveImageFragment} from "../../ResponsiveImage/fragments";

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
            image{
                responsiveImage{
                    ...ResponsiveImageFragment
                }
                focalPoint {
                    x
                    y
                }
            }
        }
  `,
  [ResponsiveImageFragment],
);
