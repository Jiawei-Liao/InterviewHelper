import React, { useState, useEffect } from 'react'
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Switch, Button, TextField, Alert } from '@mui/material'
import Papa from 'papaparse'

function Settings({ closeDialog }) {
    const [settings, setSettings] = useState({
        'OpenAI API Key': '',
        'True Random': false,
    })
    const [error, setError] = useState('')

    function validateSettings() {
        const isValid = Object.entries(settings).some(([key, value]) => {
            return key !== 'OpenAI API Key' && key !== 'True Random' && value === true
        })
        
        if (isValid) {
            setError('')
            closeDialog()
        } else {
            setError('You must leave at least 1 option open!')
        }
        
    }

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const storedData = JSON.parse(localStorage.getItem('settingsData')) || {}
                const response = await fetch('./questions.csv')
                const csvText = await response.text()
                
                Papa.parse(csvText, {
                    skipEmptyLines: true,
                    header: true,
                    complete: (results) => {
                        const types = new Set()
                        results.data.forEach(row => {
                            if (row.type) {
                                types.add(row.type)
                            }
                        })
                        
                        setSettings(prevSettings => {
                            const newSettings = { ...prevSettings }
                            types.forEach(type => {
                                newSettings[type] = true
                            })

                            Object.entries(storedData).forEach(([key, value]) => {
                                if (newSettings.hasOwnProperty(key)) {
                                    newSettings[key] = value
                                }
                            })

                            return newSettings
                        })
                    }
                })
            } catch (error) {
                console.error('Error loading settings data:', error)
            }
        }

        loadSettings()
    }, [])

    const handleChange = (option) => (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        const updatedSettings = {
            ...settings,
            [option]: value,
        }
        setSettings(updatedSettings)
        localStorage.setItem('settingsData', JSON.stringify(updatedSettings))
    }

    return (
        <Dialog open={true} onClose={validateSettings}>
            {error && <Alert severity='error'>{error}</Alert>}
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {Object.keys(settings).map(option => (
                        <Box
                            key={option}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                            <Typography sx={{ flex: 1, textAlign: 'left' }}>{option}</Typography>
                            {typeof settings[option] === 'boolean' ? (
                                <Switch
                                    checked={settings[option]}
                                    onChange={handleChange(option)}
                                />
                            ) : (
                                <Box sx={{ flex: 2, padding: 1 }}>
                                    <TextField
                                        value={settings[option]}
                                        onChange={handleChange(option)}
                                    />
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={validateSettings}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Settings
