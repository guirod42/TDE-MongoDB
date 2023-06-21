const { MongoClient } = require('mongodb');

async function run() {
  const uri = 'mongodb+srv://guirodrigues:guirodrigues@tde-banco-ii.tf7srnv.mongodb.net/'; // URI de conexão do MongoDB
  const client = new MongoClient(uri);

  try {
    await client.connect(); // Conectar ao servidor MongoDB

    const database = client.db('TDE-Banco'); // Nome do banco de dados
    const collection = database.collection('Pessoa'); // Nome da coleção

    // Executar a inserção
    const document = {
        PessoaID: 42,
        nome: 'Marco Antonio',
        idade: 72,
        email: 'marcoantonio@gmail.com',
        cpf: '001.002.003-07',
        data_nascimento: '1996-05-19',
        data_criacao: '2023-07-12T11:37:00Z'
    };

    const result = await collection.insertOne(document);
    console.log('Documento inserido com sucesso:', result.insertedId);
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  } finally {
    // Fechar a conexão com o banco de dados
    await client.close();
  }
}

run().catch(console.error);