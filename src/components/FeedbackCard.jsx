import React from 'react'
import { Paper, Typography, Divider } from "@mui/material"

function FeedbackCard({ feedback }) {
    return (
        <Paper sx={{ padding: '3% 10%' }}>
            <Typography variant="h4">
                {feedback.question.question}
            </Typography>
            <Typography variant="caption">
                {feedback.question.type}
            </Typography>
            <Divider sx={{ paddingTop: 2}}/>
            <Typography variant="h5" sx={{ paddingTop: 2}}>
                Transcription
            </Typography>
            <Typography>
                {feedback.data.transcription}
            </Typography>
            <Divider sx={{ paddingTop: 2}}/>
            <Typography variant="h5" sx={{ paddingTop: 2}}>
                Feedback
            </Typography>
            <Typography>
                {feedback.data.report.split('\\n').map((line, index) => (
                    <React.Fragment key={index}>
                    {line}
                    <br />
                    </React.Fragment>
                ))}
            </Typography>
        </Paper>
    )
}

export default FeedbackCard