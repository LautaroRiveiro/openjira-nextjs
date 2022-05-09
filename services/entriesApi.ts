import axios from 'axios'
import { IEntry } from '../interfaces'

const entriesAPI = axios.create({
  baseURL: '/api'
})

const getAll = async ():Promise<IEntry[]> => {
  const { data } = await entriesAPI.get<IEntry[]>('/entries')
  return data
}

export const entries = {
  getAll
}