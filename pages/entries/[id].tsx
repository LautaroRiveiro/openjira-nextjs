import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { useEntriesContext } from '../../context/entries'
import { servicesDB } from '../../database'
import { IEntry, EntryStatus } from '../../interfaces'
import { Layout } from '../../layouts'
import { utils } from '../../utils'

interface Props {
  entry: IEntry;
}

type Params = {
  id: string
}

const EntryPage: NextPage<Props> = ({ entry }) => {

  const [text, setText] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const { updateEntry, deleteEntry } = useEntriesContext()
  const router = useRouter()

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!touched) {
      setTouched(true)
    }
    setText(e.target.value)
  }

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus)
  }

  const handleSave = () => {
    updateEntry(entry._id, { description: text, status })
  }

  const handleDelete = async () => {
    await deleteEntry(entry._id)
    router.replace('/')
  }

  return (
    <Layout title='Detalle entrada'>
      <Grid container
        justifyContent='center'
        sx={{ mt: 2 }}
      >
        <Grid item
          xs={12} sm={8} md={6}
        >
          <Card>
            <CardHeader
              title={`Entrada: ${text.substring(0, 20)}${text.length > 20 ? '...' : ''}`}
              subheader={`Creada hace: ${utils.getDistanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ mt: 2, mb: 1 }}
                fullWidth
                autoFocus
                multiline
                label='Nueva entrada'
                placeholder='Nueva entrada'
                value={text}
                onChange={handleTextChange}
                error={touched && !text}
                helperText={touched && !text && 'Ingrese un texto'}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={handleStatusChange}
                >
                  {['pending', 'in-progress', 'finished'].map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveIcon />}
                variant='contained'
                fullWidth
                onClick={handleSave}
                disabled={!text}
              >Save</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark',
          color: 'text.primary'
        }}
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {

  const { id } = context.params!

  const entry = await servicesDB.getOneEntry(id)

  if (!entry) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage