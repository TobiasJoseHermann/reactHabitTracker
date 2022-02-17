import { Container, Typography, Grid, Alert } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import PieChart from '../components/PieChart'
import { useQuery } from 'react-query'
import StreakChart from '../components/StreakChart'
import CalendarChart from '../components/CalendarChart'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'
    
export default function HabitCharts() {
  const { id } = useParams()
  const { data, status } = useQuery('pieData', fetchData)

  async function fetchData() {
    const habitDoc = doc(db, "habits", id)
    const data = await getDoc(habitDoc)
    return data.data()

    // const res = await fetch(`http://localhost:9000/habits/${id}`)
    // return res.json()
  }

  return (
    <Container>
      { 
        status === 'success' && 
        <>
          <Typography variant="h2" component="h2">{data.name}</Typography>
          <Grid container>
            <PieChart data={data}/> 
            <StreakChart data={data}/>
            <CalendarChart data={data}/>
          </Grid>
        </>
      }
      {
        status === 'error' && <Alert severity="error" sx={{ mt: 2 }}>Error fetching data</Alert>
      }
    </Container>
  )
}