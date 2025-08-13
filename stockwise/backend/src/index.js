const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/produtos', async (req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});

app.post('/produtos', async (req, res) => {
  const { nome, descricao, quantidade, preco } = req.body;
  const produto = await prisma.produto.create({
    data: { nome, descricao, quantidade, preco },
  });
  res.json(produto);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
