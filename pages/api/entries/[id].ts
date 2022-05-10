import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'

type Data =
| { message: string }
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  const { id } = req.query

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({message: 'Id no válido'})
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res)
  
    default:
      return res.status(404).end()
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query
  
  await db.connect()
  const entryToUpdate = await Entry.findById(id)
  
  if (!entryToUpdate) {
    await db.disconnect()
    return res.status(404).end()
  }

  const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body

  try {
    // Opción 1
    // const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true})
    
    // Opción 2
    entryToUpdate.description = description
    entryToUpdate.status = status
    const updatedEntry = await entryToUpdate.save()
    
    return res.status(200).json(updatedEntry)
  } catch (error) {
    // TODO: Analizar error
    return res.status(500).json({message: 'error'})
  } finally {
    await db.disconnect()
  }
}