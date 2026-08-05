import type { RequestHandler } from "express";

import fs from "node:fs/promises";
import path from "node:path";

type User = {
  _id: string;
  name: string;
  about: string;
  avatar: string;
};

const usersPath = path.join(
  import.meta.dirname,
  "../../data/users.json"
);

const readUsers = async (): Promise<User[]> => {
  const usersData = await fs.readFile(usersPath, "utf8");

  return JSON.parse(usersData) as User[];
};

const getUsers: RequestHandler = async (_req, res) => {
  const users = await readUsers();

  res.json(users);
};

const getUserById: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const users = await readUsers();

  const user = users.find((currentUser) => currentUser._id === userId);

  if (!user) {
    res.status(404).json({
      message: "User ID not found",
    });
    return;
  }

  res.json(user);
};

export { getUsers, getUserById };