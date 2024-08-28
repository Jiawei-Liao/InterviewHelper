import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import GroupsIcon from '@mui/icons-material/Groups'

function Home() {
    const navigate = useNavigate()

    return (
        <Box>
            <Header/>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: 'calc(100vh - 64px)', gap: 5 }}>
                <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 1, height: 70, width: 300 }} onClick={() => navigate('/random')}>
                    <ShuffleIcon />
                    <Typography>
                        Random
                    </Typography>
                </Button>
                <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 1, height: 70, width: 300 }} onClick={() => navigate('/demo')}>
                    <GroupsIcon />
                    <Typography>
                        Demo Interview
                    </Typography>
                </Button>
            </Box>
        </Box>
    )
}

export default Home
/**
 * randomOptions={randomOptions} setRandomOptions={setRandomOptions}
 */