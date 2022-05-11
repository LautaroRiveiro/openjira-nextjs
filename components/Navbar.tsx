import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import Link from 'next/link'
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
        <Link href='/' passHref>
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer', display: 'contents' }}>
            OpenJira
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}