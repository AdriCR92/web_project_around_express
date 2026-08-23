import type { Request, Response } from "express";

import User from "../models/user.js";

const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find({});

  res.send(users);
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404).json({
      message: "User ID not found",
    });
    return;
  }

  res.json(user);
};

const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  const newUser = await User.create({
    name,
    about,
    avatar,
  });

  res.status(201).send(newUser);
};

export { getUsers, getUserById, createUser };