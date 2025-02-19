import { Client, SimpleSchemaTypes } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Creating new fields/fieldsets');

  console.log('Create Slug field "slug" (`slug`) in model "\uD83D\uDCDD Page" (`page`)');
  await client.fields.create('IGWgfBhdShaBqaPfQkcBPw', {
    id: 'VtUYP-vrRTOG1bhUBPTxdA',
    label: 'slug',
    field_type: 'slug',
    api_key: 'slug',
    validators: {
      slug_title_field: { title_field_id: 'OkyVZV6CRc6h4AI5-Qsf1g' },
      slug_format: { predefined_pattern: 'webpage_slug' },
    },
    appearance: { addons: [], editor: 'slug', parameters: { url_prefix: null, placeholder: null } },
  });

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Structured text field "Structured text" (`structured_text`) in model "\uD83D\uDCDD Page" (`page`)',
  );
  await client.fields.update('euBVyD4kRfSreBg3GKQ-bg', {
    validators: {
      required: {},
      structured_text_blocks: {
        item_types: ['CoOdvsbUR8GLtGeuenXzMw', 'dZOhbVOTSpeaaA-wQMgPCA', 'duRvS1PrT4u6QGJZUmyINA'],
      },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['IGWgfBhdShaBqaPfQkcBPw', 'JdG722SGTSG_jEB1Jx-0XA'],
      },
    },
  });

  console.log('Reorder fields/fieldsets for model "\uD83D\uDCDD Page" (`page`)');
  await client.itemTypes.rawReorderFieldsAndFieldsets('IGWgfBhdShaBqaPfQkcBPw', {
    data: [
      {
        id: 'VtUYP-vrRTOG1bhUBPTxdA',
        type: 'field',
        attributes: { position: 2 },
        relationships: { fieldset: { data: null } },
      },
      {
        id: 'euBVyD4kRfSreBg3GKQ-bg',
        type: 'field',
        attributes: { position: 3 },
        relationships: { fieldset: { data: null } },
      },
      {
        id: 'TQ6ZSfghTQ6l9iDDsV4qIA',
        type: 'field',
        attributes: { position: 4 },
        relationships: { fieldset: { data: null } },
      },
      {
        id: 'Dge4J5gjQCKpFWija_CJwg',
        type: 'field',
        attributes: { position: 5 },
        relationships: { fieldset: { data: null } },
      },
    ],
  });

  console.log(
    'Update Structured text field "Structured text" (`structured_text`) in model "\uD83D\uDCDD HomePage" (`homepage`)',
  );
  await client.fields.update('KexPdbR6QZuA9Wu9Oe9dYA', {
    validators: {
      required: {},
      structured_text_blocks: {
        item_types: ['CoOdvsbUR8GLtGeuenXzMw', 'dZOhbVOTSpeaaA-wQMgPCA', 'duRvS1PrT4u6QGJZUmyINA'],
      },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['IGWgfBhdShaBqaPfQkcBPw', 'JdG722SGTSG_jEB1Jx-0XA'],
      },
    },
  });

  console.log('Finalize models/block models');

  console.log('Update model "\uD83D\uDCDD Page" (`page`)');
  await client.itemTypes.update('IGWgfBhdShaBqaPfQkcBPw', {
    name: '\uD83D\uDCDD Page',
    singleton: false,
    api_key: 'page',
  });

  console.log('Update model "\uD83D\uDCDD HomePage" (`homepage`)');
  await client.itemTypes.update('JdG722SGTSG_jEB1Jx-0XA', {
    name: '\uD83D\uDCDD HomePage',
    api_key: 'homepage',
  });

  console.log('Manage menu items');

  console.log('Update menu item "\uD83D\uDCDD HomePage"');
  await client.menuItems.update('OxIhMJjsS8qXa-b8fBRB_A', { label: '\uD83D\uDCDD HomePage' });

  console.log('Update menu item "\uD83D\uDCDD Pages"');
  await client.menuItems.update('Ox4HNJaSTSSX5sWOC14O7w', { label: '\uD83D\uDCDD Pages' });
}
