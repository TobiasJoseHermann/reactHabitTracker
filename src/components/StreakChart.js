import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { Bar } from 'react-chartjs-2'

function calculateBestStreaks(data) {
  // Add a negative in the array so the algorithm works
  let dataArr = [...data, {score: "negative", day: 1}]
  let streakArr = [0,0,0,0,0]
  let streak = 0

  dataArr.forEach(item => {
    if (!item.score) {}
    else if (item.score === 'positive') ++streak    
    else {
      let min = Math.min(...streakArr)
      if (min < streak) streakArr[streakArr.indexOf(min)] = streak
      streak = 0
    }
  })

  streakArr.sort().reverse()
  return streakArr
}

export default function StreakChart( props ) {

  const data = {
    labels: ["1","2","3","4","5"],
    datasets: [
      {
        label: "Streak",
        data: calculateBestStreaks(props.data.scores),
        backgroundColor: [
          "green",
        ],
        borderColor: "grey",
        borderWidth: 1,
      },
    ],
  } 

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        ticks: {
          display: false
        },
        grid: {
          display: false,
          drawTicks: false
        }
      },
      x: {
        ticks: {
          display: false
        },
        grid: {
          display: false,
          drawTicks: false
        }
      }
    }
  }
  
  return (
    <Card sx={{ maxWidth: 500, margin: 1 }}>
      <CardContent>
        <Typography variant="h3" component="h2">Best Streaks</Typography>
        <Bar options={options} data={data}/>
      </CardContent>
    </Card>
  )
}
