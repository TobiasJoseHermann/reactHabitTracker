import React from 'react'
import { Box, TextField, Button, Typography, Alert } from "@mui/material"
import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext';
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
// import { nanoid } from 'nanoid'

// TODO: Cannot create habit with same name

export default function CreateHabit() {
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  const { currentUser } = useAuth()
  const collectionRef = collection(db, "habits")

  const [newHabit, setNewHabit] = React.useState({
    // id: nanoid(),
    email: currentUser.email,
    name: "",
    scores: []
  })


  async function handleSubmit(e) {
    e.preventDefault()

    if (!newHabit.name) {
      setError('Habit name cannot be empty')
      return
    }

    try {
      setError('')
      setLoading(true)

      await addDoc(collectionRef, newHabit)

      // const res = await fetch(`http://localhost:9000/users/${currentUser.email}/data`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      //   body: JSON.stringify(newHabit)
      // })
      // const data = res.json()

      navigate('/')
    } catch {
      setError('Failed to create habit')
    }
  }

  function handleChange(e) {
    setNewHabit({
      ...newHabit,
      name: e.target.value
    })
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography variant="h2">Create Habit</Typography>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <TextField
        sx={{ mt: 2 }}
        id="name"
        type="text"
        label="Habit Name"
        value={newHabit.name}
        onChange={handleChange}
      />
      <Button 
        sx={{ mt: 2 }}
        type="submit" 
        disabled={loading} 
        color="primary"
      >
      Create new Habit
      </Button>
    </Box>
  )
}
