const { MongoClient } = require('mongodb');

async function run() {
  const uri = 'mongodb+srv://guirodrigues:guirodrigues@tde-banco-ii.tf7srnv.mongodb.net/'; // URI de conexão do MongoDB
  const client = new MongoClient(uri);

  try {
    await client.connect(); // Conectar ao servidor MongoDB

    const database = client.db('TDE-Banco'); // Nome do banco de dados
    const collection = database.collection('Pessoa'); // Nome da coleção

    // Executar a query
    const query = { "PessoaID": { $gt: 17, $lte: 42 } };
    const pessoas = await collection.find(query).toArray();

    // Exibir os documentos encontrados
    pessoas.forEach(pessoa => {
      console.log(pessoa);
    });
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  } finally {
    // Fechar a conexão com o banco de dados
    await client.close();
  }
}

run().catch(console.error);
