import axios from 'axios'
import { IEntry } from '../interfaces'

const entriesAPI = axios.create({
  baseURL: '/api'
})

const getAll = async ():Promise<IEntry[]> => {
  const { data } = await entriesAPI.get<IEntry[]>('/entries')
  return data
}

const getOne = async (id: string):Promise<IEntry> => {
  const { data } = await entriesAPI.get<IEntry>('/entries/' + id)
  return data
}

const create = async (description: string):Promise<IEntry> => {
  const { data } = await entriesAPI.post<IEntry>('/entries', { description })
  return data
}

const update = async (id: string, entry: Partial<IEntry>):Promise<IEntry> => {
  const { data } = await entriesAPI.put<IEntry>('/entries/' + id, entry)
  return data
}

const remove = async (id:string):Promise<void> => {
  await entriesAPI.delete<void>('/entries/' + id)
  return
}

export const entries = {
  getAll,
  create,
  update,
  remove
}