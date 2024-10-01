require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Расширенные настройки CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Или конкретный URL: 'http://localhost:5173'
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  exposedHeaders: 'X-Total-Count,Content-Range',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// CRUD операции

// Получить всех клиентов
app.get('/clients', async (req, res) => {
  try {
    const { _end, _start, _sort, _order, ...filters } = req.query;

    let query = Client.find();

    // Фильтрация
    if (filters) {
      query = query.find(filters);
    }

    // Сортировка
    if (_sort && _order) {
      const sortOrder = _order === 'ASC' ? 1 : -1;
      query = query.sort({ [_sort]: sortOrder });
    }

    // Пагинация
    if (_start && _end) {
      query = query
        .skip(parseInt(_start))
        .limit(parseInt(_end) - parseInt(_start));
    }

    const clients = await query.exec();
    const total = await Client.countDocuments(filters);

    // Добавление заголовка X-Total-Count для поддержки пагинации в react-admin
    res.set('X-Total-Count', total.toString());
    res.set('Access-Control-Expose-Headers', 'X-Total-Count, Content-Range');

    res.status(200).send(clients);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Получить клиента по ID
app.get('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).send();
    }
    res.status(200).send({ data: client });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Создать клиента
app.post('/clients', async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).send({ data: newClient });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Обновить клиента по ID
app.put('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!client) {
      return res.status(404).send();
    }
    res.status(200).send({ data: client });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Удалить клиента по ID
app.delete('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).send();
    }
    res.status(200).send({ data: client });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports = app;
