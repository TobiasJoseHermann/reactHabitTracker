import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Habits from './routes/Habits'
import Login from './routes/Login'
import PrivateRoute from './components/PrivateRoute'
import SingUp from './routes/SingUp'
import NavBar from './components/NavBar'
import NotFoundPage from './routes/NotFoundPage'
import Footer from './components/Footer'
import { AuthProvider } from './contexts/AuthContext'
import CreateHabit from './routes/CreateHabit'
import HabitCharts from './routes/HabitCharts'
import About from './routes/About'
// eslint-disable-next-line no-unused-vars
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import ResetPassword from './routes/ResetPassword'

const queryClient = new QueryClient()

export default function App() {

  const [darkMode, setDarkMode] = React.useState(false)

  function toggleTheme() {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light'
    },
  });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavBar toggleTheme={toggleTheme} isDarkMode={darkMode}/>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<PrivateRoute><Habits /></PrivateRoute>}/>
              <Route path="/reactHabitTracker" element={<PrivateRoute><Habits /></PrivateRoute>}/>
              <Route path="/signUp" element={<SingUp />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/resetPassword" element={<ResetPassword />}/>
              <Route path="/about" element={<About />}/>
              <Route path="/createHabit" element={<CreateHabit />}/>
              <Route path="/habitChart/:id" element={<HabitCharts />}/>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}