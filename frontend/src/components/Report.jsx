import { Box, Button, Typography, Divider, Stack, Grid2 } from '@mui/material'
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
          <Box sx={{ flex: 1, overflowY: 'auto', padding: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={3} sx={{ width: '50%' }}>
              {storedData && storedData.map((item, index) => (
                <Button key={index} variant='contained' sx={{ height: 80, minHeight: 80, width: '100%'}} onClick={() => goToFeedback(index)}>
                    <Grid2 container spacing={2} sx={{ width: '100%' }}>
                        <Grid2 size={7}>
                            <Typography>
                                {new Date(item.date).toLocaleDateString(navigator.language || 'en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true})}
                            </Typography>
                        </Grid2>
                        <Grid2 size={1} justifyContent='center'>
                            <Divider orientation='vertical' />
                        </Grid2>
                        <Grid2 size={4} justifyContent='flex-start'>
                            <Typography>
                                {getInterviewType(item.interviews)}
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Button>
              ))}
            </Stack>
          </Box>
        </Box>
    )
}

export default Report