import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database'
import { Entry, IEntry } from '../../models'

type Data = IEntry[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllEntries(res)
 
    default:
      return res.status(404).end()
  }
}

const getAllEntries = async (res: NextApiResponse<Data>) => {

  await db.connect()
  const entries = await Entry.find().sort({createdAt: 'ascending'})
  await db.disconnect()

  res.status(200).json(entries)
}