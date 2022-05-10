import axios from 'axios'
import { IEntry } from '../interfaces'

const entriesAPI = axios.create({
  baseURL: '/api'
})

const getAll = async ():Promise<IEntry[]> => {
  const { data } = await entriesAPI.get<IEntry[]>('/entries')
  return data
}

const create = async (description: string):Promise<IEntry> => {
  const { data } = await entriesAPI.post<IEntry>('/entries', { description })
  return data
}

export const entries = {
  getAll,
  create
}