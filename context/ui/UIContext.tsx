import { createContext, FC, PropsWithChildren, ReactElement, ReactNode, ReducerWithoutAction, useContext, useReducer, useState } from 'react'

type UIContextType = {
  isSideMenuOpened: boolean;
  toggleSideMenu: () => void;
  isAddingEntry: boolean;
  toggleAddingEntry: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined)

const UIContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {

  const [isSideMenuOpened, toggleSideMenu] = useReducer<ReducerWithoutAction<boolean>>(state => !state, false)
  const [isAddingEntry, toggleAddingEntry] = useReducer<ReducerWithoutAction<boolean>>(state => !state, false)

  const value: UIContextType = {
    isSideMenuOpened,
    toggleSideMenu,
    isAddingEntry,
    toggleAddingEntry
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

const useUIContext = () => {
  const context = useContext(UIContext)

  if (context === undefined) {
    throw new Error('useUIContext must be used within a Provider')
  }

  return context
}

export {
  UIContextProvider,
  useUIContext
}