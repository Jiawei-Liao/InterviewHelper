import React, { useState } from 'react'
import { AppBar, Toolbar, Box, Typography, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Settings from './Settings'
import FeedbackIcon from '@mui/icons-material/Feedback'
import GitHubIcon from '@mui/icons-material/GitHub'
import SettingsIcon from '@mui/icons-material/Settings'

function Header() {
    const navigate = useNavigate()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    function openDialog() {
        setIsDialogOpen(true)
    }

    function closeDialog() {
        setIsDialogOpen(false)
    }

    return (
        <Box>
            <AppBar position='static'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton sx={{ borderRadius: 0 }} color='inherit' onClick={() => navigate('/') }>
                        <Typography>
                            InterviewHelper
                        </Typography>
                    </IconButton>
                    <Box>
                        <IconButton sx={{ borderRadius: 0 }} color='inherit' onClick={() => window.open('https://github.com/Jiawei-Liao/InterviewHelper', '_blank') }>
                            <GitHubIcon />
                        </IconButton>
                        <IconButton sx={{ borderRadius: 0 }} color='inherit' onClick={() => navigate('/feedback') }>
                            <FeedbackIcon />
                        </IconButton>
                        <IconButton sx={{ borderRadius: 0 }} color='inherit' onClick={openDialog}>
                            <SettingsIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {isDialogOpen && <Settings closeDialog={closeDialog} />}
        </Box>
    )
}

export default Header