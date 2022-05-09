import { Box, List, Paper } from "@mui/material"
import { DragEvent, FC } from "react"
import { EntryListItem } from "."
import { useEntriesContext } from "../context/entries"
import { useUIContext } from "../context/ui"
import { EntryStatus } from "../interfaces"

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries, updateEntryStatus } = useEntriesContext()
  const { isDragging, setIsDragging } = useUIContext()

  const entriesByStatus = entries.filter(entry => entry.status === status)

  // Necesario hacer preventDefault para que funcione el onDrop
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('id')
    updateEntryStatus(id, status)
    setIsDragging(false)
  }

  const draggingStyle = isDragging ? {
    opacity: 0.3,
    border: '2px dashed white',
    borderRadius: '2px',
    transition: 'all .2s'
  } : { transition: 'all .3s' }

  return (
    <Box
      component={'div'}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={{ ...draggingStyle }}
    >
      <Paper
        className='hidescroll'
        sx={{
          height: 'calc(100vh - 250px)',
          overflow: 'scroll',
          backgroundColor: 'transparent',
          padding: '3px 5px'
        }}
      >
        <List sx={{ opacity: 1 }}>
          {
            entriesByStatus.map(entry => (
              <EntryListItem key={entry._id} entry={entry} />
            ))
          }
        </List>
      </Paper>
    </Box>
  )
}