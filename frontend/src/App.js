import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from "@mui/material"
import { firebaseDB } from './firebaseConfig'
import { doc, updateDoc, increment } from 'firebase/firestore'

import theme from './theme'

import Home from './components/Home'
import Feedback from './components/Feedback'
import Random from './components/Random'
import Demo from './components/Demo'
import Report from './components/Report'

function App() {
  useEffect(() => {
    const incrementUserCount = async () => {
      const userCountRef = doc(firebaseDB, 'UserCount', 'UserCount')
      await updateDoc(userCountRef, {
        TotalUsers: increment(1)
      })

      if (localStorage.getItem('TotalUniqueUsers') === null) {
        localStorage.setItem('TotalUniqueUsers', '1')
        await updateDoc(userCountRef, {
          TotalUniqueUsers: increment(1)
        })
      }

    }
    incrementUserCount()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/feedback' element={ <Feedback /> } />
            <Route path='/random' element={ <Random /> } />
            <Route path='/demo' element={ <Demo /> } />
            <Route path='/report' element={ <Report /> } />
          </Routes>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App
