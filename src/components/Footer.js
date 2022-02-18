import React from 'react'
import { Link, Container} from '@mui/material'
import { useNavigate } from 'react-router'

export default function Footer() {

  const navigate = useNavigate()

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Link onClick={() => navigate('/about')} sx={{ cursor: 'pointer' }}>About</Link>
    </Container>
  )
}
