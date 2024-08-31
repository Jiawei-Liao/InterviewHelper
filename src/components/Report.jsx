import { Box } from '@mui/material'
import Header from './Header'

function Report() {
    const storedData = JSON.parse(localStorage.getItem('reportData')) || {}
    console.log(storedData)
    return (
        <Box>
            <Header />
        </Box>
    )
}

export default Report