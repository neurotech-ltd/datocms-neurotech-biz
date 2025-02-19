import { Client, SimpleSchemaTypes } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Finalize models/block models');

  console.log('Update model "\uD83D\uDCDD HomePage" (`homepage`)');
  await client.itemTypes.update('JdG722SGTSG_jEB1Jx-0XA', {
    name: '\uD83D\uDCDD HomePage',
    api_key: 'homepage',
  });
}
