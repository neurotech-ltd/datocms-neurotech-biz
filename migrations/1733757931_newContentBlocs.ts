// import { Client, SimpleSchemaTypes } from '@datocms/cli/lib/cma-client-node';
//
// export default async function (client: Client) {
//   console.log('Destroy fields in existing models/block models');
//
//   console.log(
//     'Delete Structured text field "Structured text" (`structured_text`) in model "\uD83D\uDCDD Page" (`page`)',
//   );
//   await client.fields.destroy('euBVyD4kRfSreBg3GKQ-bg');
//
//   console.log(
//     'Delete Structured text field "Structured text" (`content`) in model "\uD83D\uDCDD Project" (`project`)',
//   );
//   await client.fields.destroy('X30zkJbBTQqbETnjcyb5Fw');
//
//   console.log('Update existing fields/fieldsets');
//
//   console.log(
//     'Update Modular Content (Multiple blocks) field "content" (`content`) in model "\uD83D\uDCDD Page" (`page`)',
//   );
//   await client.fields.update('AEaqK0A1Swm3-UjVY7f52Q', {
//     validators: {
//       rich_text_blocks: { item_types: ['IUB6AMqeSFOPeKrmY2tEUQ', 'LJdf0p1pRS6X8fTG5NPBLA'] },
//     },
//   });
//
//   console.log('Reorder fields/fieldsets for model "\uD83D\uDCDD Page" (`page`)');
//   await client.itemTypes.rawReorderFieldsAndFieldsets('IGWgfBhdShaBqaPfQkcBPw', {
//     data: [
//       {
//         id: 'TQ6ZSfghTQ6l9iDDsV4qIA',
//         type: 'field',
//         attributes: { position: 5 },
//         relationships: { fieldset: { data: null } },
//       },
//       {
//         id: 'Dge4J5gjQCKpFWija_CJwg',
//         type: 'field',
//         attributes: { position: 6 },
//         relationships: { fieldset: { data: null } },
//       },
//     ],
//   });
//
//   console.log(
//     'Update Modular Content (Multiple blocks) field "content" (`content`) in model "\uD83D\uDCDD Project" (`project`)',
//   );
//   await client.fields.update('d9y0YqsaSZWhjJuPX905wQ', {
//     api_key: 'content',
//     validators: {
//       rich_text_blocks: { item_types: ['IUB6AMqeSFOPeKrmY2tEUQ', 'LJdf0p1pRS6X8fTG5NPBLA'] },
//     },
//   });
//
//   console.log(
//     'Update Structured text field "Structured Text" (`structured_text`) in block model "content bloc" (`content_bloc`)',
//   );
//   await client.fields.update('G8fmW8IuTym4AuNeiq5v2A', {
//     label: 'Structured Text',
//     api_key: 'structured_text',
//     validators: {
//       structured_text_blocks: {
//         item_types: [
//           'CoOdvsbUR8GLtGeuenXzMw',
//           'Ix1r-4kiSNCevWomEouqZQ',
//           'dZOhbVOTSpeaaA-wQMgPCA',
//           'duRvS1PrT4u6QGJZUmyINA',
//         ],
//       },
//       structured_text_links: {
//         on_publish_with_unpublished_references_strategy: 'fail',
//         on_reference_unpublish_strategy: 'delete_references',
//         on_reference_delete_strategy: 'delete_references',
//         item_types: ['E4YDt_D9Scq3pJQEE2k-jw', 'IGWgfBhdShaBqaPfQkcBPw'],
//       },
//     },
//   });
//
//   console.log(
//     'Update Modular Content (Multiple blocks) field "blocs" (`blocs`) in block model "Section Block" (`section_block`)',
//   );
//   await client.fields.update('Cp0DjEHcTSiNcg0cZ9vrDQ', { label: 'blocs', api_key: 'blocs' });
// }
