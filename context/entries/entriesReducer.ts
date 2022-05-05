import { Reducer, useReducer } from "react"
import { v4 as uuidv4 } from 'uuid'
import { IEntry } from "../../interfaces"

// Interfaces y Tipos
interface State {
  entries: IEntry[];
}

enum ActionType {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}

type Action =
| { type: ActionType.INCREASE, payload: number }
| { type: ActionType.DECREASE, payload: string }


// Funciones generadoras de acciones
export const increment = (value: number) : Action => {
  return {type: ActionType.INCREASE, payload: value}
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
   case ActionType.INCREASE:
     return {
       ...state,
       // ...
     }
 
   default:
     return state
 }
}

export const useEntriesReducer = (_initState: State = initialState) => useReducer(reducer, _initState)