import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Header from './Header'
import Interview from './Interview'
import { fetchQuestion, saveInterviewReport } from './utils'
import { useNavigate } from 'react-router-dom'

function Random() {
    const navigate = useNavigate()
    const [question, setQuestion] = useState('')
    
    useEffect(() => {
        const getQuestion = async () => {
            const fetchedQuestion = await fetchQuestion()
            setQuestion(fetchedQuestion)
        }
        getQuestion()
    }, [])
    
    function finishInterview(data) {
        const interviewData = [{
            question: question,
            data: data
        }]
        saveInterviewReport(interviewData)
        navigate('/feedback', { state: interviewData })
    }

    return (
        <Box>
            <Header />
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: 'calc(100vh - 64px)' }}>
                <Interview question={question} finishInterview={finishInterview}/>
            </Box>
        </Box>
    )
}

export default Random