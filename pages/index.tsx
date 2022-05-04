import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { Layout } from '../layouts'

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Typography variant='h1'>Hola Mundo</Typography>
    </Layout>
  )
}

export default HomePage
