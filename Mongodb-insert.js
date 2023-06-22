const { MongoClient } = require('mongodb');
const fs = require('fs');

async function run() {
  const uri = 'mongodb+srv://guirodrigues:guirodrigues@tde-banco-ii.tf7srnv.mongodb.net/'; // URI de conexão do MongoDB
  const client = new MongoClient(uri);

  try {
    await client.connect(); // Conectar ao servidor MongoDB

    const database = client.db('TDE-Banco'); // Nome do banco de dados
    const collection = database.collection('Pessoa'); // Nome da coleção

    // Executar a inserção
    const document = {
      PessoaID: 25,
      nome: 'Teste',
      idade: 30,
      email: ['teste01@uniaraxa.edu.br', 'teste02@gmail.com', 'teste03@bol.com.br'],
      cpf: '448.002.003-07',
      data_nascimento: '1962-02-06',
      data_criacao: '2000-08-01T11:37:00Z'
    };

    const result = await collection.insertOne(document);
    console.log('Documento inserido com sucesso:', result.insertedId);

    // Criar arquivo com os documentos
    const fileName = 'insert';
    const directoryPath = './Resultados';
    createTxtFile(document, fileName, directoryPath);

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