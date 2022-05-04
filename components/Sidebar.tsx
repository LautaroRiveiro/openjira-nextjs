import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import InboxIcon from '@mui/icons-material/Inbox'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import SendIcon from '@mui/icons-material/Send'
import DraftsIcon from '@mui/icons-material/Drafts'

const menuItems = [
  { title: 'Inbox', icon: <InboxIcon /> },
  { title: 'Starred', icon: <StarBorderIcon /> },
  { title: 'Send Email', icon: <SendIcon /> },
  { title: 'Drafts', icon: <DraftsIcon /> }
]

export const Sidebar = () => {

  const handleClose = () => {
    console.log('Close...')
  }

  return (
    <Drawer
      anchor="left"
      open={true}
      onClose={handleClose}
    >
      <Box sx={{ padding: '5px 10px', width: 250 }}>
        <Typography variant="h5">Menú</Typography>
      </Box>
      <List>
        {
          menuItems.map(item => (
            <ListItem key={item.title}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))
        }
      </List>
      <Divider />
      <List>
        {
          menuItems.map(item => (
            <ListItem key={item.title}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))
        }
      </List>
    </Drawer>
  )
}