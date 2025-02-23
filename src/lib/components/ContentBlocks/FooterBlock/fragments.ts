import {graphql} from '$lib/datocms/graphql';

/**
 */

export const FooterBlockFragment = graphql(
  /* GraphQL */ `
        fragment FooterBlockFragment on FooterBlockRecord
        {
            title
            description
        }
  `,
  [],
);
