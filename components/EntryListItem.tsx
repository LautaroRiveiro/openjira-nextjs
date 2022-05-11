import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { DragEvent, FC } from "react"
import { useUIContext } from "../context/ui"
import { IEntry } from "../interfaces"

interface Props {
  entry: IEntry
}

export const EntryListItem: FC<Props> = ({ entry }) => {

  const { setIsDragging } = useUIContext()
  const router = useRouter()

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('id', entry._id)
    setIsDragging(true)
  }

  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    setIsDragging(false)
  }

  const handleClick = () => {
    router.push('/entries/' + entry._id)
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography
            sx={{ whiteSpace: 'pre-line' }}
          >
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}
        >
          <Typography variant='body2'>hace 30 mins</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}