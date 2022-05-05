import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { useUIContext } from '../context/ui'

export const Navbar = () => {

  const { toggleSideMenu } = useUIContext()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleSideMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          OpenJira
        </Typography>
      </Toolbar>
    </AppBar>
  )
}