import {graphql} from '$lib/datocms/graphql';

/**
 */

export const HeroImageBlockFragment = graphql(
  /* GraphQL */ `
        fragment HeroImageBlockFragment on HeroImageBlockRecord
        {
            title
            image{
                responsiveImage{
                    ... ResponsiveImageFragment
                }
                focalPoint {
                    x
                    y
                }
            }
        }
  `,
  [],
);
