import { createContext, FC, PropsWithChildren, useContext, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { EntryStatus, IEntry } from '../../interfaces'
import { entriesApi } from '../../services'
import { entriesActions, useEntriesReducer } from './entriesReducer'

type ContextProps = {
  entries: IEntry[];
  addEntry: (description: string) => void;
  updateEntryStatus: (id: string, status: EntryStatus) => void;
  updateEntry: (id: string, data: Partial<IEntry>) => void;
  deleteEntry: (id: string) => void;
}

const EntriesContext = createContext<ContextProps | undefined>(undefined)

const EntriesContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {

  const [state, dispatch] = useEntriesReducer()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const getEntries = async () => {
      const entries = await entriesApi.getAll()
      dispatch(entriesActions.initEntries(entries))
    }
    getEntries()
  }, [dispatch])

  const addEntry = async (description: string) => {
    const newEntry = await entriesApi.create(description)
    dispatch(entriesActions.addEntry(newEntry))
  }

  const updateEntryStatus = async (id: string, status: EntryStatus) => {
    try {
      const updatedEntry = await entriesApi.update(id, { status })
      dispatch(entriesActions.updateEntry(updatedEntry))
    } catch (e) {
      console.error(e)
    }
  }

  const updateEntry = async (id: string, data: Partial<IEntry>) => {
    try {
      const updatedEntry = await entriesApi.update(id, data)
      dispatch(entriesActions.updateEntry(updatedEntry))
      enqueueSnackbar('Entrada actualizada', { variant: 'success' })
    } catch (e) {
      console.error(e)
    }
  }

  const deleteEntry = async (id: string) => {
    try {
      await entriesApi.remove(id)
      dispatch(entriesActions.deleteEntry(id))
      enqueueSnackbar('Entrada eliminada', { variant: 'info' })
    } catch (error) {
      console.error(error)
    }
  }

  const value: ContextProps = {
    ...state,
    addEntry,
    updateEntryStatus,
    updateEntry,
    deleteEntry
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
