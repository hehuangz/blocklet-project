/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import { getUserById, updateUser } from '../models/user-model';

export async function getUser(req: Request, res: Response): Promise<any> {
  try {
    const id = parseInt(req.params.id!, 10);
    if (Number.isNaN(id)) {
      return res.status(400).send({ error: 'Invalid user ID' });
    }

    const user = await getUserById(id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function updateUserDetails(req: Request, res: Response): Promise<any> {
  try {
    const id = parseInt(req.params.id!, 10);
    if (Number.isNaN(id)) {
      return res.status(400).send({ error: 'Invalid user ID' });
    }
    await updateUser(id, req.body.username, req.body.email, req.body.phone);
    res.send({ message: 'User updated successfully' });
  } catch (err) {
    if (Array.isArray(err) && err.every((e) => e instanceof Error)) {
      return res.status(400).send({ error: 'Validation failed', details: err });
    }
    res.status(500).send({ error: 'Internal Server Error' });
  }
}
