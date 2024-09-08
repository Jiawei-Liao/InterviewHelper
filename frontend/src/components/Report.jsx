import { Box, Paper, IconButton, Typography, Divider } from '@mui/material'
import Header from './Header'
import { useNavigate } from 'react-router-dom'

function Report() {
    const storedData = JSON.parse(localStorage.getItem('reportData')) || {}
    const navigate = useNavigate()

    function goToFeedback(index) {
        const specificFeedback = storedData[index]
        navigate('/feedback', { state: specificFeedback.interviews })
    }

    function getInterviewType(interview) {
        switch (interview.length) {
            case 1:
                return 'Random'
            case 7:
                return 'Interview'
            default:
                return 'Unknown'
        }
    }

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box sx={{ flex: 1, overflowY: 'auto', padding: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                {storedData && storedData.map((item, index) => (
                    <IconButton sx={{ borderRadius: 0 }} color='inherit' onClick={() => goToFeedback(index)}>
                        <Paper key={index} sx={{ height: 80, width: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1, gap: 15 }}>
                            <Typography variant='h5'>
                                {new Date(item.date).toLocaleString()}
                            </Typography>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Typography variant='h5'>
                                {getInterviewType(item.interviews)}
                            </Typography>
                        </Paper>
                    </IconButton>
                ))}
            </Box>
        </Box>
    )
}

export default Report