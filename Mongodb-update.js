const { MongoClient } = require('mongodb');
const fs = require('fs');

async function run() {
  const uri = 'mongodb+srv://guirodrigues:guirodrigues@tde-banco-ii.tf7srnv.mongodb.net/'; // URI de conexão do MongoDB
  const client = new MongoClient(uri);

  try {
    await client.connect(); // Conectar ao servidor MongoDB

    const database = client.db('TDE-Banco'); // Nome do banco de dados
    const collection = database.collection('Pessoa'); // Nome da coleção

    // Definir o filtro para identificar o documento a ser atualizado
    const filter = { PessoaID: 25, nome: 'Teste' };

    // Definir as atualizações a serem aplicadas ao documento
    const update = {
      $set: {
        cpf: '123.456.789.00',
        idade: 29
      }
    };

    // Executar a operação de atualização
    const result = await collection.updateOne(filter, update);
    
    // Criar arquivo com os documentos
    const refDados = 'Where: ' + JSON.stringify(filter) + ' NewData: ' + JSON.stringify(update);

    const fileName = 'update2';
    const directoryPath = './Resultados';

    if (result.modifiedCount > 0) {
      console.log('Documento atualizado com sucesso');
      createTxtFile(refDados, fileName, directoryPath);
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

function createTxtFile(data, fileName, directoryPath) {
  const dateTime = getCurrentDateTime();
  const filePath = `${directoryPath}/${dateTime}_${fileName}.txt`;
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData);
  console.log(`Arquivo ${filePath} criado com sucesso!`);
}

function getCurrentDateTime() {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().replace(/[:.]/g, '');
  return formattedDate;
}

run().catch(console.error);