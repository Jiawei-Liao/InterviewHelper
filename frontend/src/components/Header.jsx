import React, { useState } from 'react'
import { AppBar, Toolbar, Box, Typography, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Settings from './Settings'
import Suggestions from './Suggestions'
import FeedbackIcon from '@mui/icons-material/Feedback'
import GitHubIcon from '@mui/icons-material/GitHub'
import SettingsIcon from '@mui/icons-material/Settings'

function Header() {
    const navigate = useNavigate()
    const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
    const [isSuggestionsDialogOpen, setIsSuggestionsDialogOpen] = useState(false)

    function openSettingsDialog() {
        setIsSettingsDialogOpen(true)
    }

    function closeSettingsDialog() {
        setIsSettingsDialogOpen(false)
    }

    function openSuggestionsDialog() {
        setIsSuggestionsDialogOpen(true)
    }

    function closeSuggestionsDialog() {
        setIsSuggestionsDialogOpen(false)
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
                        <IconButton sx={{ borderRadius: 0 }} color='inherit' onClick={openSuggestionsDialog}>
                            <FeedbackIcon />
                        </IconButton>
                        <IconButton sx={{ borderRadius: 0 }} color='inherit' onClick={openSettingsDialog}>
                            <SettingsIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {isSettingsDialogOpen && <Settings closeDialog={closeSettingsDialog} />}
            {isSuggestionsDialogOpen && <Suggestions closeDialog={closeSuggestionsDialog} />}
        </Box>
    )
}

export default Header