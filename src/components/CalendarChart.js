import React from 'react'
import { Card, Typography, Grid, Avatar } from '@mui/material';

export default function CalendarChart( props ) {


  let day = 0
  const dayElements = props.data.scores.map(score => {
    ++day
    let bg
    if (score.score === 'positive') bg = 'green'
    else if (score.score === 'neutral') bg = 'blue'
    else if (score.score === 'negative') bg = 'red'

    return (
      <Grid key={score.date} sx={{ textAlign: 'center', padding: 1 }} item >
        <Avatar style={{backgroundColor: bg}}>
          <Typography >{day}</Typography>
        </Avatar> 
      </Grid>
    )


  })

  return (

    <Card sx={{ maxWidth: 500, margin: 1 }}>
      <Typography variant="h3" component="h2">Records</Typography>
      <Grid container sx={{ maxWidth: 540}}>
        {dayElements}
      </Grid>
    </Card>
  )
}

    // <Avatar style={{backgroundColor: 'red'}}>
    //   <Typography >33</Typography>
    // </Avatar> 