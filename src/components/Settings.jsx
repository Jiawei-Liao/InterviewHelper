import React, { useState, useEffect } from 'react'
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Switch, Button, TextField } from '@mui/material'
import Papa from 'papaparse'

function Settings({ closeDialog }) {
    const [settings, setSettings] = useState({
        'OpenAI API Key': '',
        'True Random': false,
    })

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
                        console.log(results)
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

                            console.log(newSettings)
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
        <Dialog open={true} onClose={closeDialog}>
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
                                <Box sx={{ flex:2, padding:1 }}>
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
                <Button onClick={closeDialog} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Settings
