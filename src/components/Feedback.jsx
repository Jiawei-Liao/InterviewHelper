import { Box } from '@mui/material'
import Header from './Header'
import FeedbackCard from './FeedbackCard'
import { useLocation } from 'react-router-dom'

function Feedback() {
    const location = useLocation()
    const feedback = location.state
    console.log(feedback)
    /**
        @todo: might need to get feedback from local storage with specific data based on index provided by param
    **/
    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box sx={{ flex: 1, overflowY: 'auto', padding: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {feedback && feedback.map((item, index) => (
                        <FeedbackCard key={index} feedback={item} />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Feedback