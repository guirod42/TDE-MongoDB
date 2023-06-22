const { MongoClient } = require('mongodb');
const fs = require('fs');

async function run() {
  const uri = 'mongodb+srv://guirodrigues:guirodrigues@tde-banco-ii.tf7srnv.mongodb.net/'; // URI de conexão do MongoDB
  const client = new MongoClient(uri);

  try {
    await client.connect(); // Conectar ao servidor MongoDB

    const database = client.db('TDE-Banco'); // Nome do banco de dados
    const collection = database.collection('Pessoa'); // Nome da coleção

    // Executar a query
    const query = { "PessoaID": { $gte: 5, $lte: 15 } };
    // const query = { "PessoaID": 10 };
    const pessoas = await collection.find(query).toArray();

    // Criar arquivo com os documentos
    const fileName = 'select';
    const directoryPath = './Resultados';
    createTxtFile(pessoas, fileName, directoryPath);
    
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
