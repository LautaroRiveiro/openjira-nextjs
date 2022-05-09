import { Reducer, useReducer } from "react"
import { IEntry } from "../../interfaces"

// Interfaces y Tipos
interface State {
  entries: IEntry[];
}

enum ActionType {
  ADD_ENTRY = 'ADD_ENTRY',
  UPDATE_ENTRY = 'UPDATE_ENTRY',
}

type Action =
| { type: ActionType.ADD_ENTRY, payload: IEntry }
| { type: ActionType.UPDATE_ENTRY, payload: {id: string, entry: Partial<IEntry>} }


// Funciones generadoras de acciones
export const addEntry = (description: string) : Action => {

  const newEntry : IEntry= {
    _id: 'uuidv4()',
    createdAt: Date.now(),
    description,
    status: 'pending'
  }

  return {type: ActionType.ADD_ENTRY, payload: newEntry}
}

export const updateEntry = (id: string, entry: Partial<IEntry>) : Action => {
  return {type: ActionType.UPDATE_ENTRY, payload: {id, entry}}
}

// Estado inicial
const initialState : State = {
  entries: []
}

// Reducer
const reducer : Reducer<State, Action> = (state, action) => {
 switch (action.type) {
   case ActionType.ADD_ENTRY:
     return {
       ...state,
       entries: [...state.entries, action.payload]
     }
   
   case ActionType.UPDATE_ENTRY:
     const entries = state.entries.map(entry => {
      if (entry._id === action.payload.id) {
        const updatedEntry: IEntry = {
          ...entry,
          ...action.payload.entry,
          _id: entry._id
        }
        return updatedEntry
      }
      return entry
     })

     return {
       ...state,
       entries
     }
 
   default:
     return state
 }
}

export const useEntriesReducer = (_initState: State = initialState) => useReducer(reducer, _initState)
export const entriesActions = {
  addEntry,
  updateEntry
}