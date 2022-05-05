import { Reducer, useReducer } from "react"
import { v4 as uuidv4 } from 'uuid'
import { IEntry } from "../../interfaces"

// Interfaces y Tipos
interface State {
  entries: IEntry[];
}

enum ActionType {
  ADD_ENTRY = 'ADD_ENTRY'
}

type Action =
| { type: ActionType.ADD_ENTRY, payload: IEntry }


// Funciones generadoras de acciones
export const addEntry = (description: string) : Action => {

  const newEntry : IEntry= {
    _id: uuidv4(),
    createdAt: Date.now(),
    description,
    status: 'pending'
  }

  return {type: ActionType.ADD_ENTRY, payload: newEntry}
}

// Estado inicial
const initialState : State = {
  entries: [{
    _id: uuidv4(),
    createdAt: Date.now(),
    description: 'pending: Terminar el curso de React Native',
    status: "pending"
  },
  {
    _id: uuidv4(),
    createdAt: Date.now(),
    description: 'progress: Terminar el curso de Next',
    status: "in-progress"
  },
  {
    _id: uuidv4(),
    createdAt: Date.now(),
    description: 'finished: Terminar el curso de Redux',
    status: "finished"
  }]
}

// Reducer
const reducer : Reducer<State, Action> = (state, action) => {
 switch (action.type) {
   case ActionType.ADD_ENTRY:
     return {
       ...state,
       entries: [...state.entries, action.payload]
     }
 
   default:
     return state
 }
}

export const useEntriesReducer = (_initState: State = initialState) => useReducer(reducer, _initState)
export const entriesActions = {
  addEntry
}