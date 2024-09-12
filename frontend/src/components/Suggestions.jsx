import { useState } from 'react'
import { Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material'
import { firebaseDB } from '../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

function Suggestions({ closeDialog }) {
    const [suggestions, setSuggestions] = useState('')

    function isValidSuggestion() {
        return suggestions.trim().length > 0
    }

    async function sendSuggestions() {
        if (isValidSuggestion) {
            try {
                const suggestionsRef = collection(firebaseDB, 'Suggestions')
                await addDoc(suggestionsRef, {
                    Suggestion: suggestions,
                    Date: new Date()
                })
                closeDialog()
            } catch (error) {
                console.error('Error submitting suggestions: ', error)
            }
        }
    }

    return (
        <Dialog open={true} onClose={closeDialog}>
            <DialogTitle>Help me improve!</DialogTitle>
            <DialogContent>
                <Typography>
                    I'm always looking for ways to improve my projects. If you have any suggestions, please let me know!
                </Typography>
                <TextField
                    multiline
                    rows={10}
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    fullWidth
                    variant="outlined"
                    placeholder="Your suggestions..."
                    sx={{ marginTop: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color="secondary">Cancel</Button>
                <Button onClick={sendSuggestions} disabled={!isValidSuggestion()} color="success">Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Suggestions