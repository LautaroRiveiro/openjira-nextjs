import { Reducer, useReducer } from "react"
import { IEntry } from "../../interfaces"

// Interfaces y Tipos
interface State {
  entries: IEntry[];
}

enum ActionType {
  ADD_ENTRY = 'ADD_ENTRY',
  UPDATE_ENTRY = 'UPDATE_ENTRY',
  INIT_ENTRIES = 'INIT_ENTRIES',
  DELETE_ENTRY = 'DELETE_ENTRY',
}

type Action =
| { type: ActionType.ADD_ENTRY, payload: IEntry }
| { type: ActionType.UPDATE_ENTRY, payload: IEntry }
| { type: ActionType.INIT_ENTRIES, payload: IEntry[] }
| { type: ActionType.DELETE_ENTRY, payload: string }


// Funciones generadoras de acciones
export const addEntry = (newEntry: IEntry) : Action => {
  return {type: ActionType.ADD_ENTRY, payload: newEntry}
}

export const updateEntry = (updatedEntry: IEntry) : Action => {
  return {type: ActionType.UPDATE_ENTRY, payload: updatedEntry}
}

export const initEntries = (entries: IEntry[]) : Action => {
  return {type: ActionType.INIT_ENTRIES, payload: entries}
}

export const deleteEntry = (id: string) : Action => {
  return {type: ActionType.DELETE_ENTRY, payload: id}
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
      if (entry._id === action.payload._id) {
        return action.payload
      }
      return entry
     })

     return {
       ...state,
       entries
     }
 
   case ActionType.INIT_ENTRIES:
    return {
      ...state,
      entries: [...action.payload]
    }

    case ActionType.DELETE_ENTRY:
    return {
      ...state,
      entries: state.entries.filter((entry) => entry._id !== action.payload)
    }

   default:
     return state
 }
}

export const useEntriesReducer = (_initState: State = initialState) => useReducer(reducer, _initState)
export const entriesActions = {
  addEntry,
  updateEntry,
  initEntries,
  deleteEntry
}