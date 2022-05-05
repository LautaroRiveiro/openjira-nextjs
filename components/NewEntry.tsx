import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { Box, Button, TextField } from '@mui/material'
import { ChangeEvent, FC, useReducer, useState } from 'react'
import { useEntriesContext } from '../context/entries'
import { useUIContext } from '../context/ui'

export const NewEntry: FC = () => {

  const { addEntry } = useEntriesContext()

  const { isAddingEntry, toggleAddingEntry } = useUIContext()
  const [text, setText] = useState('')
  const [touched, toggleTouched] = useReducer(s => !s, false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!touched) toggleTouched()
    setText(e.target.value)
  }

  const handleBlur = () => {
    if (!touched) toggleTouched()
  }

  const handleSave = () => {
    if (text.length > 0) {
      addEntry(text)
      toggleAddingEntry()
      toggleTouched()
      setText('')
    }
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {
        isAddingEntry ? (
          <>
            <TextField
              sx={{ marginTop: 2, marginBottom: 1 }}
              placeholder='Nueva entrada'
              label='Nueva entrada'
              fullWidth
              multiline
              autoFocus
              onBlur={handleBlur}
              error={touched && text.length <= 0}
              helperText={touched && text.length <= 0 && 'Ingrese un texto'}
              value={text}
              onChange={handleChange}
            />

            <Box display='flex' justifyContent='space-around'>
              <Button
                variant='text'
                onClick={toggleAddingEntry}
              >
                Cancelar
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                endIcon={<SaveOutlinedIcon />}
                onClick={handleSave}
              >
                Guardar
              </Button>
            </Box>
          </>
        ) : (
          <Button
            startIcon={<AddCircleOutlinedIcon />}
            fullWidth
            variant='outlined'
            onClick={toggleAddingEntry}
          >Agregar tarea</Button>
        )
      }
    </Box>
  )
}