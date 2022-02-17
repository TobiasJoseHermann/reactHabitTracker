import React from 'react'
import { Container, Alert } from '@mui/material';
import Habit from '../components/Habit'
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase'
import { collection, getDocs, updateDoc, deleteDoc, doc, arrayUnion } from 'firebase/firestore'
const MILISECONDSINDAY = 86400000

export default function Dashboard() {
  const [habits, setHabits] = React.useState([])
  const { currentUser } = useAuth()
  const [error, setError] = React.useState(null)

  
  const collectionRef = collection(db, "habits")
  React.useEffect(() => {
    async function getHabits() {
      try {
        setError('')
        const res = await getDocs(collectionRef)
        const allData = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        // TODO: do this server side
        const data = allData.filter((doc) => doc.email === currentUser.email)

        // const res = await fetch(`http://localhost:9000/users/${currentUser.email}`)
        // const data = await res.json()

        const date = new Date()
        const days = Math.floor(date.getTime()/MILISECONDSINDAY)
        data.forEach(habit => {
          if (!habit.scores[habit.scores.length-1] || habit.scores[habit.scores.length-1].date !== days){
            habit.scores.push({ date: days, score: ""})
            appendHabitScore(habit.id, days)
          }
        })

        setHabits(data)
      } catch {
        setError('An error occurred')
      }
    }

    getHabits()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function appendHabitScore(id, date) {
    const habitDoc = doc(db, "habits", id)

    await updateDoc(habitDoc, { scores: arrayUnion({date, score: ""})})
  }

  async function changeScore(type, toSubtract, id) {
    let habit = habits.find(habit => habit.id === id)

    const habitDoc = doc(db, "habits", id)

    habit.scores[habit.scores.length - toSubtract - 1] = 
    {...habit.scores[habit.scores.length - toSubtract - 1], score: type}
      
    try {
      setError('')
      await updateDoc(habitDoc, {scores: habit.scores})
    } catch {
      setError('An error occurred')
    }

    // const res = await fetch(`http://localhost:9000/users/${currentUser.email}/${id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     scores: habit.scores,
    //   }),
    // })
    // const  data = await res.json()

    // setHabits(habits.map(habit => habit.id === id ? data : habit))
  }

  async function deleteHabit(id) {

    const habitDoc = doc(db, "habits", id)
    try {
      setError('')
      await deleteDoc(habitDoc)
      setHabits(habits.filter(habit => habit.id !== id))
    } catch {
      setError('An error occurred')

    }

    // const res = await fetch(`http://localhost:9000/habits/${id}`, {
    //   method: 'DELETE',
    // })

    // if(res.status === 200) {
    //   setHabits(habits.filter(habit => habit.id !== id))
    // } else {
    //   alert('Error deleting this task')
    // }
  }

  const habitsElements = habits.map( habit => {
    return (
      <Habit 
        key={habit.id} 
        id={habit.id}
        name={habit.name}
        scores={habit.scores}
        changeScore={changeScore}
        deleteHabit={deleteHabit}
      />
    ) 
  })

  return (
    <Container>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      { habitsElements }
    </Container>
  )
}
