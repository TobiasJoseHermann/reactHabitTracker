import { Delete, OpenInFull } from '@mui/icons-material'
import { IconButton, Icon, Button, Card, Typography, Radio, Grid } from '@mui/material'
import { useNavigate } from 'react-router'
import React from 'react'

function getDaysArray(){
  const date = new Date()
  switch (date.getDay()){
    case 0: return ['MO','TU','WE','TH','FR','SA','SU']
    case 1: return ['TU','WE','TH','FR','SA','SU','MO']
    case 2: return ['WE','TH','FR','SA','SU','MO','TU']
    case 3: return ['TH','FR','SA','SU','MO','TU','WE']
    case 4: return ['FR','SA','SU','MO','TU','WE','TH']
    case 5: return ['SA','SU','MO','TU','WE','TH','FR']
    case 6: return ['SU','MO','TU','WE','TH','FR','SA']
    default: return ['err']
  }
}

export default function Habit({ id, name, scores, changeScore, deleteHabit }) {

  const [selectedValue, setSelectedValue] = React.useState(-1)
  const [daysArray] = React.useState(() => getDaysArray())
  const navigate = useNavigate()

  function handleChange(e) {
    setSelectedValue(e.target.value)
  }

  function handleClick(score, selectedValue, habitId) {
    changeScore(score, selectedValue, habitId)
    setSelectedValue(-1)
  }

  const typographyElements = daysArray.map(day => {
    return (
      <Grid key={day} sx={{ textAlign: 'center', mb: 1 }} item xs={2}>
        <Typography>{day}</Typography>
      </Grid>
    ) 
  })

  function getScoreElements(){
     const start = scores.length - 7
     let icon 

     const scoreElements = []

     for (let i = start; i !== scores.length; ++i){
       if (!scores[i]){
         icon = "deselect"
       } else {
         const score = scores[i].score
         switch(score) {
           case "positive": icon = "done"; break
           case "neutral": icon = "check_box_outline_blank"; break
           case "negative": icon = "clear"; break
           default: icon = "help_outline"
         }
       }

       scoreElements.push(
         <Grid key={i} sx={{ textAlign: 'center' }} item xs={2}>
           <Icon>{icon}</Icon>
         </Grid>
       )

    }
    return scoreElements
  }

  const scoreElements = getScoreElements()

  function getRadioElements(){
    const radioElements = [] 
    let start = scores.length - 7

    for(let counter = 6; counter >= 0; --counter) {
       radioElements.push(
        <Grid key={counter} sx={{ textAlign: 'center' }} item xs={2}>
          <Radio
            onChange={handleChange}
            value={counter}
            name="radio-buttons"
            disabled={!scores[start]}
            checked={counter.toString() === selectedValue}
          />
        </Grid>
      )
      ++start
    }

    return radioElements
  }

  const radioElements = getRadioElements()


  return (
    <Card sx={{ m: 2 }}>
      <Grid container>
        <Grid item sx={{ mr: 2, ml: 2, flexGrow: 1}}>
          <Typography variant="h4" component="h4">{name}</Typography>
        </Grid>
        <Grid>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate(`/habitChart/${id}`)}
          >
            <OpenInFull />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => deleteHabit(id)}
          >
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container columns={14}>
        {typographyElements}
        {scoreElements}
        {radioElements}
      </Grid>
      { selectedValue !== -1 &&
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button onClick={() => handleClick("positive", selectedValue, id)}>Positive</Button>
        <Button onClick={() => handleClick("neutral", selectedValue, id)}>Neutral</Button>
        <Button onClick={() => handleClick("negative", selectedValue, id)}>Negative</Button>
        <Button onClick={() => handleClick("", selectedValue, id)}>Reset</Button>
      </div>
      }
    </Card>
  )
}
