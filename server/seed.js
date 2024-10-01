require("dotenv").config();
const mongoose = require("mongoose");
const Client = require("./models/Client.js");
console.log("Seeding database...", process.env.DATABASE_URL);

// Подключение к базе данных
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("MongoDB connected");
    console.log("Database URL:", process.env.DATABASE_URL);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Тестовые данные
const clients = [
  { name: "Ivan Ivanov", email: "ivan@example.com", phone: "123456789" },
  { name: "Petr Petrov", email: "petr@example.com", phone: "987654321" },
  { name: "Olga Smirnova", email: "olga@example.com", phone: "555444333" },
];

const seedClients = async () => {
  console.log("Seeding database...");
  try {
    await Client.deleteMany({}, { timeout: 30000 });
    await Client.insertMany(clients);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedClients();
