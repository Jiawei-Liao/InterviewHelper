import React, { useState, useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import Header from './Header'
import Interview from './Interview'
import { fetchQuestion, saveInterviewReport } from './utils'
import { useNavigate } from 'react-router-dom'

function Demo() {
    const navigate = useNavigate()
    const [question, setQuestion] = useState('')
    const seenQuestions = useRef([])
    const demoQuestionTypes = useRef([
        'Introduction', 'Company', 'Positive Situation', 'Negative Situation', 
        'Positive Situation', 'Negative Situation', 'Motivation'
    ])
    const [demoQuestionNumber, setDemoQuestionNumber] = useState(0)
    const [interviewData, setInterviewData] = useState([])

    function finishInterview(data) {
        seenQuestions.current.push(question.question)
        setDemoQuestionNumber(prev => prev + 1)
        setInterviewData(prev => [
            ...prev,
            {
                question: question,
                data: data
            }   
        ])
    }

    useEffect(() => {
        const getQuestion = async () => {
            if (demoQuestionNumber >= demoQuestionTypes.current.length) {
                saveInterviewReport(interviewData)
                navigate('/feedback', { state: interviewData })
            } else {
                const questionType = demoQuestionTypes.current[demoQuestionNumber]
                const fetchedQuestion = await fetchQuestion(questionType, seenQuestions.current)
                
                if (fetchedQuestion !== '') {
                    setQuestion(fetchedQuestion)
                } else {
                    setDemoQuestionNumber(prev => prev + 1)
                }
            }
        }

        getQuestion()
    }, [demoQuestionNumber, interviewData, navigate])

    return (
        <Box>
            <Header />
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: 'calc(100vh - 64px)' }}>
                <Interview question={question} finishInterview={finishInterview}/>
            </Box>
        </Box>
    )
}

export default Demo
