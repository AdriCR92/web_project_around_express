import type { Request, Response } from "express";

import mongoose from "mongoose";
import Card from "../models/card.js";

const getCards = async (_req: Request, res: Response) => {
  const cards = await Card.find({});

  res.send(cards);
};

const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;

  if (!req.user?._id) {
    throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
  }

  const newCard = await Card.create({
    name,
    link,
    owner: new mongoose.Types.ObjectId(req.user._id),
  });

  res.status(201).send(newCard);
};

const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedCard = await Card.findByIdAndDelete(id);

  if (!deletedCard) {
    throw Object.assign(new Error("Card ID not found"), { statusCode: 404 });
  }

  res.send(deletedCard);
};

export { getCards, createCard, deleteCard };