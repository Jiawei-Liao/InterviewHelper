import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import RandomOptionsDialog from "./RandomOptionsDialog"
import FeedbackIcon from '@mui/icons-material/Feedback'
import GitHubIcon from '@mui/icons-material/GitHub'
import SettingsIcon from '@mui/icons-material/Settings'

function Header() {
    const navigate = useNavigate()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [randomOptions, setRandomOptions] = useState({
        AAAAAAAAAAAAAA: true,
        B: true,
        C: true
    })

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('randomOptionsData'))
        if (storedData) {
            const currentKeys = Object.keys(randomOptions)
            const storedKeys = Object.keys(storedData)

            const keysMatch = currentKeys.every(key => storedKeys.includes(key)) &&
                              storedKeys.every(key => currentKeys.includes(key))

            if (keysMatch) {
                setRandomOptions(storedData)
            }
        }
    }, [randomOptions, setRandomOptions])

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
                    <IconButton sx={{ borderRadius: 0 }} color="inherit" onClick={() => navigate('/') }>
                        <Typography>
                            InterviewHelper
                        </Typography>
                    </IconButton>
                    <Box>
                        <IconButton sx={{ borderRadius: 0 }} color="inherit" onClick={() => window.open('https://github.com/Jiawei-Liao/InterviewHelper', '_blank') }>
                            <GitHubIcon />
                        </IconButton>
                        <IconButton sx={{ borderRadius: 0 }} color="inherit" onClick={() => navigate('/feedback') }>
                            <FeedbackIcon />
                        </IconButton>
                        <IconButton sx={{ borderRadius: 0 }} color="inherit" onClick={openDialog}>
                            <SettingsIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {isDialogOpen && <RandomOptionsDialog randomOptions={randomOptions} setRandomOptions={setRandomOptions} closeDialog={closeDialog} />}
        </Box>
    )
}

export default Header