const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors"); // Permite chamadas de outras origens (frontend)

const app = express();
const PORT = 3000;

// Configurações do servidor
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database("./feedbacks.db", (err) => {
  if (err) return console.error(err.message);
  console.log("Conectado ao banco de dados SQLite.");
});

// Criação da tabela de feedbacks, se não existir
db.run(`CREATE TABLE IF NOT EXISTS feedbacks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  rating INTEGER,
  comment TEXT
)`);

// Rota para adicionar feedback
app.post("/add-feedback", (req, res) => {
  const { rating, comment } = req.body;
  db.run(
    `INSERT INTO feedbacks (rating, comment) VALUES (?, ?)`,
    [rating, comment],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json({ message: "Feedback adicionado com sucesso!" });
    }
  );
});

// Rota para exibir feedbacks
app.get("/feedbacks", (req, res) => {
  db.all(`SELECT * FROM feedbacks`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
