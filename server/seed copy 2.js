// const axios = require('axios');

// // URL для Data API
// const apiUrl = 'https://data.mongodb-api.com/app/66ebfd502ac5902ef7ff9eba/endpoint/data/v1/action/insertMany';
// // const apiKey = '82dbbda0-ff8f-4e94-81e8-b16b78fbbf20';

// const apiKey = 'yipqwrvq'

// const seedClients = async () => {
//   // Данные для заполнения
//   const clients = [
//     { name: 'Ivan Ivanov', email: 'ivan@example.com', phone: '123456789' },
//     { name: 'Petr Petrov', email: 'petr@example.com', phone: '987654321' },
//     { name: 'Olga Smirnova', email: 'olga@example.com', phone: '555444333' },
//   ];

//   try {
//     // Запрос на вставку документов
//     const response = await axios.post(
//       apiUrl,
//       {
//         dataSource: 'Cluster0', // замените на ваш кластер
//         database: 'alpha',      // замените на вашу базу данных
//         collection: 'clients',  // коллекция, которую хотите создать или в которую хотите вставить данные
//         documents: clients,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'api-key': apiKey,
//         },
//       }
//     );
//     console.log('Clients added:', response.data);
//   } catch (error) {
//     console.error('Error seeding clients:', error.response?.data || error.message);
//   }
// };

// seedClients();
