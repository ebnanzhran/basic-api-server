'use strict';
const express = require('express');

const { Clothes } = require('../modles/index');

const clothesRouter = express.Router();

//add routes here
clothesRouter.get('/clothe', getClothes);
clothesRouter.get('/clothe/:id', getOneClothe);
clothesRouter.post('/clothe', addClothe);
clothesRouter.put('/clothe/:id', updateClothe);
clothesRouter.delete('/clothe/:id', deleteClothe);

async function getClothes(req, res) {
  const clothes = await Clothes.findAll();
  res.status(200).json(clothes);
}
async function getOneClothe(req, res) {
  const clotheId = parseInt(req.params.id);
  const clothe = await Clothes.findOne({ where: { id: clotheId } });
  res.status(200).json(clothe);
}
async function addClothe(req, res) {
  const newClothe = req.body;
  const clothe = await Clothes.create(newClothe);
  res.status(201).json(clothe);
}
async function updateClothe(req, res) {
  const clotheId = parseInt(req.params.id);
  const updateClothe = req.body;
  const foundClothe = await Clothes.findOne({ where: { id: clotheId } });
  if (foundClothe) {
    const updatedClothe = await foundClothe.update(updateClothe);
    res.status(201).json(updatedClothe);
  } else {
    res.status(404).json({ message: 'clothe not found' });
  }
}
async function deleteClothe(req, res) {
  const clotheId = parseInt(req.params.id);
  const foundClothe = await Clothes.findOne({ where: { id: clotheId } });
  if (foundClothe) {
    await foundClothe.destroy();
    res.status(204).json({ message: 'clothe deleted' });
  } else {
    res.status(404).json({ message: 'clothe not found' });
  }
}
module.exports = clothesRouter;