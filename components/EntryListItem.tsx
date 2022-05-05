import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { FC } from "react"
import { IEntry } from "../interfaces"

interface Props {
  entry: IEntry
}

export const EntryListItem: FC<Props> = ({entry}) => {
  return (
    <Card
      sx={{ marginBottom: 1 }}
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