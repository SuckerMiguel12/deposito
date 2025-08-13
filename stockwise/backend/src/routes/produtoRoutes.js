const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});

router.post('/', async (req, res) => {
  const { nome, descricao, quantidade, preco } = req.body;
  const novo = await prisma.produto.create({
    data: { nome, descricao, quantidade, preco },
  });
  res.status(201).json(novo);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, quantidade, preco } = req.body;
  const atualizado = await prisma.produto.update({
    where: { id: parseInt(id) },
    data: { nome, descricao, quantidade, preco },
  });
  res.json(atualizado);
});

router.delete('/:id', async (req, res) => {
  await prisma.produto.delete({ where: { id: parseInt(req.params.id) } });
  res.sendStatus(204);
});

module.exports = router;
