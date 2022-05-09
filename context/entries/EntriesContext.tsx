import { createContext, FC, PropsWithChildren, useContext, useEffect } from 'react'
import { EntryStatus, IEntry } from '../../interfaces'
import { entriesApi } from '../../services'
import { entriesActions, useEntriesReducer } from './entriesReducer'

type ContextProps = {
  entries: IEntry[];
  addEntry: (description: string) => void;
  updateEntryStatus: (id: string, status: EntryStatus) => void;
}

const EntriesContext = createContext<ContextProps | undefined>(undefined)

const EntriesContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {

  const [state, dispatch] = useEntriesReducer()

  useEffect(() => {
    const getEntries = async () => {
      const entries = await entriesApi.getAll()
      dispatch(entriesActions.initEntries(entries))
    }
    getEntries()
  }, [dispatch])

  const addEntry = (description: string) => {
    dispatch(entriesActions.addEntry(description))
  }

  const updateEntryStatus = (id: string, status: EntryStatus) => {
    dispatch(entriesActions.updateEntry(id, { status }))
  }

  const value: ContextProps = {
    ...state,
    addEntry,
    updateEntryStatus
  }

  return (
    <EntriesContext.Provider value={value}>
      {children}
    </EntriesContext.Provider>
  )
}

const useEntriesContext = () => {
  const context = useContext(EntriesContext)

  if (context === undefined) {
    throw new Error('useEntriesContext must be used within a Provider')
  }

  return context
}

export {
  EntriesContextProvider,
  useEntriesContext
}
