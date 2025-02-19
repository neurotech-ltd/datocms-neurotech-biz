import { graphql } from '$lib/datocms/graphql';
import { ItemLinkFragment } from '../../ItemLink/fragments';
import { InlineItemFragment } from '../../InlineItem/fragments';
import { ImageByTextBlockFragment } from '../../Block/ImageByTextBlock/fragments';
import { ImageBlockFragment } from '../../Block/ImageBlock/fragments';
import { ImageGalleryBlockFragment } from '../../Block/ImageGalleryBlock/fragments';
import { VideoBlockFragment } from '../../Block/VideoBlock/fragments';

/**
 * Let's define the GraphQL fragment needed for the component to function.
 *
 * GraphQL fragment colocation keeps queries near the components using them,
 * improving maintainability and encapsulation. Fragment composition enables
 * building complex queries from reusable parts, promoting code reuse and
 * efficiency. Together, these practices lead to more modular, maintainable, and
 * performant GraphQL implementations by allowing precise data fetching and
 * easier code management.
 *
 * Learn more: https://gql-tada.0no.co/guides/fragment-colocation
 */

export const ContentBlocFragment = graphql(
  /* GraphQL */ `
    fragment ContentBlocFragment on ContentBlocRecord {
      id
      __typename
      header
      structuredText {
        value
        blocks {
          ... on RecordInterface {
            id
            __typename
          }
          ... on ImageBlockRecord {
            ...ImageBlockFragment
          }
          ... on ImageGalleryBlockRecord {
            ...ImageGalleryBlockFragment
          }
          ... on VideoBlockRecord {
            ...VideoBlockFragment
          }
          ... on ImageByTextBlockRecord {
            ...ImageByTextBlockFragment
          }
        }
        links {
          ... on RecordInterface {
            id
            __typename
          }
          ...ItemLinkFragment
          ...InlineItemFragment
        }
      }
    }
  `,
  [
    ItemLinkFragment,
    InlineItemFragment,
    ImageBlockFragment,
    ImageGalleryBlockFragment,
    VideoBlockFragment,
    ImageByTextBlockFragment,
  ],
);

//[ItemLinkFragment, InlineItemFragment]
//
// export const ContentBlocFragment = graphql(
//     /* GraphQL */ `
//     fragment ContentBlocFragment on ContentBlocRecord {
//       header
//       content {
//         ... BlockFragment
//       }
//     }
//   `,
//     [BlockFragment],
// );
