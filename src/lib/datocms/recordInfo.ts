import type { SchemaTypes } from '@datocms/cma-client';

/*
 * Both the "Web Previews" and "SEO/Readability Analysis" plugins from DatoCMS
 * need to know the URL of the site that corresponds to each DatoCMS record to
 * work properly. These two functions are responsible for returning this
 * information, and are utilized by the API routes associated with the two
 * plugins:
 *
 * - src/routes/api/seo-analysis/+server.ts
 * - src/routes/api/preview-links/+server.ts
 */

export async function recordToWebsiteRoute(
  item: SchemaTypes.Item,
  itemTypeApiKey: string,
  locale: string,
): Promise<string | null> {
  switch (itemTypeApiKey) {
    case 'homepage': {
      return '/';
    }
    case 'page': {
      return `/${await recordToSlug(item, itemTypeApiKey, locale)}`;
    }
    case 'project': {
      return `/project/${await recordToSlug(item, itemTypeApiKey, locale)}`;
    }
    case 'article': {
      return `/article/${await recordToSlug(item, itemTypeApiKey, locale)}`;
    }
    default:
      return null;
  }
}

export async function recordToSlug(
  item: SchemaTypes.Item,
  itemTypeApiKey: string,
  locale: string,
): Promise<string | null> {
  switch (itemTypeApiKey) {
    case 'article': {
      return item.attributes.slug as string;
    }
    case 'project': {
      return item.attributes.slug as string;
    }
    case 'page': {
      return item.attributes.slug as string;
    }
    case 'homepage': {
      return '/' as string;
    }
    default:
      return null;
  }
}
