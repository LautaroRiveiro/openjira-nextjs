import { Box, List, Paper } from "@mui/material"
import { FC } from "react"
import { EntryListItem } from "."
import { useEntriesContext } from "../context/entries"
import { EntryStatus } from "../interfaces"

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries } = useEntriesContext()

  const entriesByStatus = entries.filter(entry => entry.status === status)

  return (
    <Box>
      <Paper
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