import { Request, Response } from "express";
import db from "../database/connection";

export default class ConnectionController {
  async index(req: Request, res: Response) {
    const totalConnections = await db('connections').count('* as total');

    const { total } = totalConnections[0];

    res.status(200).send({ total })
  }

  async create(req: Request, res: Response) {
    const { user_id } = req.body;

    try {
      await db('connections').insert({
        user_id
      })

      res.sendStatus(201)

    } catch (error) {
      res.sendStatus(400)
    }
  }
}