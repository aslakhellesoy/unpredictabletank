import arc from '@architect/functions'
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Entity, Table } from 'dynamodb-toolbox';

type NewSquad = {
  name: string;
};

type SquadWithId = NewSquad & { id: string, status: string, sk: string }

export async function createSquad(squad: NewSquad) {
  const client = await arc.tables()
  const tableName = client._name('single-table');
  if (!tableName) throw new Error('No such table: single-table')

  const SingleTable = new Table({
    name: tableName,
    partitionKey: "PK",
    sortKey: "SK",
    DocumentClient: client._doc as unknown as DocumentClient,
  });

  const Squad = new Entity<SquadWithId>({
    name: "Squad",
    attributes: {
      id: { partitionKey: true },
      sk: { hidden: true, sortKey: true },
      name: { map: "data" },
      status: ["sk", 0]
    },
    table: SingleTable,
  });

  const id = '345';
  await Squad.put({ ...squad, id: id, status: 'hello', sk: 'squad' })

  const response = await Squad.get({ id, sk: 'squad' })
  console.log(response)

  console.log('Create squad')
}