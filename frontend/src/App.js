import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {CssBaseline, ThemeProvider} from "@mui/material"

import theme from './theme'

import Home from './components/Home'
import Feedback from './components/Feedback'
import Random from './components/Random'
import Demo from './components/Demo'
import Report from './components/Report'

function App() {
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
