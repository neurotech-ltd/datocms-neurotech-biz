import {graphql} from '$lib/datocms/graphql';
import {ContentBlockFragment} from '../ContentBlock/fragments';
import {TeamBlockFragment} from "../TeamBlock/fragments";
import {ProjectsBlockFragment} from "../ProjectsBlock/fragments";
import {ContactBlockFragment} from "../ContactBlock/fragments";
import {MapBlockFragment} from "../MapBlock/fragments";
import {HeroImageBlockFragment} from "../HeroImageBlock/fragments";
import {FooterBlockFragment} from "../FooterBlock/fragments";

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

export const SectionBlockFragment = graphql(
  /* GraphQL */ `
        fragment SectionBlockFragment on SectionBlockRecord {
            ... on RecordInterface {
                id
                __typename
            }

            header
            blocs {
                ... on RecordInterface {
                    id
                    __typename
                }
                ... on ContentBlockRecord {
                    ...ContentBlockFragment
                }
                ... on TeamBlockRecord {
                    ...TeamBlockFragment
                }
                ... on ProjectsBlockRecord{
                    ...ProjectsBlockFragment
                }
                ... on ContactBlockRecord{
                    ...ContactBlockFragment
                }
                ... on MapBlockRecord{
                    ...MapBlockFragment
                }
                ... on HeroImageBlockRecord
                {
                    ...HeroImageBlockFragment
                }
                ... on FooterBlockRecord
                {
                    ...FooterBlockFragment
                }
            }
        }
  `,
  [ContentBlockFragment, TeamBlockFragment, ProjectsBlockFragment, ContactBlockFragment, MapBlockFragment, HeroImageBlockFragment,FooterBlockFragment,],
);
