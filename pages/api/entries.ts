import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database'
import { Entry, IEntry } from '../../models'

type Data =
| IEntry[]
| IEntry
| string

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllEntries(res)
    
    case 'POST':
      return createEntry(req, res)
 
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

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  // Elimino el posible enviado _id
  let {_id, ...body} = req.body

  const newEntry = new Entry({
    ...body,
    createdAt: Date.now(), // Sobreescribo un posible createdAt enviado
  })

  try {
    await db.connect()
    await newEntry.save()
    await db.disconnect()

    return res.status(201).json(newEntry)
    
  } catch (error: any) {
    await db.disconnect()
    // TODO: Comprobar si es un error 400, 401 o 500
    return res.status(500).end()
  }
}