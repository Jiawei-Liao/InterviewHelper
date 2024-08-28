import { Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Switch, Button } from '@mui/material'

function RandomOptionsDialog({ randomOptions, setRandomOptions, closeDialog }) {
    const handleChange = (option) => (event) => {
        setRandomOptions(prevOptions => ({
            ...prevOptions,
            [option]: event.target.checked
        }))
        localStorage.setItem('randomOptionsData', JSON.stringify({
            ...randomOptions,
            [option]: event.target.checked
        }))
    }

    return (
        <Dialog open={true} onClose={closeDialog}>
            <DialogTitle>Random Options</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {Object.keys(randomOptions).map(option => (
                        <Box
                            key={option}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                            <Typography sx={{ flex: 1, textAlign: 'left' }}>{option}</Typography>
                            <Switch
                                checked={randomOptions[option]}
                                onChange={handleChange(option)}
                            />
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

export default RandomOptionsDialog
