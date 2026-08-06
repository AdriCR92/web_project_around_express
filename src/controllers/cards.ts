import type { RequestHandler } from "express";

import fs from "node:fs/promises";
import path from "node:path";


type Card = {
  _id: string;
  name: string;
  link: string;
};

const cardsPath = path.join(
  import.meta.dirname,
  "../../data/cards.json"
);

const getCards: RequestHandler = async (_req, res) => {
  const cardsData = await fs.readFile(cardsPath, "utf8");
  const cards = JSON.parse(cardsData) as Card[];
  res.json(cards);
};

export { getCards };