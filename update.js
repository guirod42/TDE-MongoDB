const { MongoClient } = require('mongodb');

async function run() {
  const uri = 'mongodb+srv://guirodrigues:guirodrigues@tde-banco-ii.tf7srnv.mongodb.net/'; // URI de conexão do MongoDB
  const client = new MongoClient(uri);

  try {
    await client.connect(); // Conectar ao servidor MongoDB

    const database = client.db('TDE-Banco'); // Nome do banco de dados
    const collection = database.collection('Pessoa'); // Nome da coleção

    // Definir o filtro para identificar o documento a ser atualizado
    const filter = { PessoaID: 42, nome: 'Marco Antonio' };

    // Definir as atualizações a serem aplicadas ao documento
    const update = {
      $set: {
        PessoaID: 25,
        idade: 63,
      }
    };

    // Executar a operação de atualização
    const result = await collection.updateOne(filter, update);
    
    if (result.modifiedCount > 0) {
      console.log('Documento atualizado com sucesso');
    } else {
      console.log('Nenhum documento foi atualizado');
    }
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  } finally {
    // Fechar a conexão com o banco de dados
    await client.close();
  }
}

run().catch(console.error);