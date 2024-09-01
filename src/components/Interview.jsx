import { useEffect, useRef, useState } from 'react'
import { Box, Paper, Typography, Button, CircularProgress } from '@mui/material'

function Interview({ question, finishInterview }) {
    const videoRef = useRef(null)
    const [recordingStatus, setRecordingStatus] = useState('waiting')
    const [recordedUrl, setRecordedUrl] = useState('')
    const mediaStream = useRef(null)
    const mediaRecorder = useRef(null)
    const chunks = useRef([])
    const [receivedData, setReceivedData] = useState(null)

    useEffect(() => {
        const startVideoStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing camera: ', error);
            }
        };
    
        startVideoStream();

        const videoElement = videoRef.current;
        return () => {
            if (videoElement && videoElement.srcObject) {
                const stream = videoElement.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, []);

    async function record() {
        if (recordingStatus === 'waiting') {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(
                  { audio: true }
                )
                mediaStream.current = stream
                mediaRecorder.current = new MediaRecorder(stream)
                mediaRecorder.current.ondataavailable = (e) => {
                  if (e.data.size > 0) {
                    chunks.current.push(e.data)
                  }
                }
                mediaRecorder.current.onstop = () => {
                  const recordedBlob = new Blob(
                    chunks.current, { type: 'audio/mp3' }
                  )
                  const url = URL.createObjectURL(recordedBlob)
                  setRecordedUrl(url)
                  chunks.current = []
                }
                mediaRecorder.current.start()
            } catch (error) {
                console.error('Error accessing microphone:', error)
            }
            setRecordingStatus('recording')
        } else if (recordingStatus === 'recording') {
            if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
                mediaRecorder.current.stop()
            }
            if (mediaStream.current) {
                mediaStream.current.getTracks().forEach((track) => {
                    track.stop()
                })
            }
            setRecordingStatus('recorded')
            mediaRecorder.current.onstop = async () => {
                const recordedBlob = new Blob(chunks.current, { type: 'audio/mp3' })
                setRecordedUrl(URL.createObjectURL(recordedBlob))
    
                const formData = new FormData()
                formData.append('file', recordedBlob, 'recording.mp3')

                const APIKey = JSON.parse(localStorage.getItem('settingsData'))['OpenAI API Key'] || ''
                const data = {
                    APIKey: APIKey,
                    question: question.question,
                    questionType: question.type
                }

                formData.append('data', JSON.stringify(data))
                
                try {
                    const response = await fetch('http://localhost:5000/getFeedback', {
                        method: 'POST',
                        body: formData,
                    })
                    const result = await response.json()
                    console.log(result)
                    setReceivedData(result)
                } catch (error) {
                    console.error('Error sending audio to server:', error)
                }
            }
            
        }
    }

    function clickFinishInterview() {
        setRecordingStatus('waiting')
        setRecordedUrl('')
        chunks.current = [];  // Reset chunks
        mediaStream.current?.getTracks().forEach((track) => track.stop());  // Stop the media stream
        mediaStream.current = null;  // Reset mediaStream reference
        mediaRecorder.current = null;
        setReceivedData(null)
        finishInterview(receivedData)
    }

    return (
        <Paper sx={{ display: 'flex', height: '90%', width: '70%', border: '2px solid rgba(0, 0, 0, 0.2)', borderRadius: '8px', gap: 5, padding: 5 }}>
            <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 4 }}>
                <Typography variant='h5'>
                    {question.question}
                </Typography>
                <Button onClick={record} variant='contained' disabled={recordingStatus === 'recorded'}>
                    {(recordingStatus === 'waiting') ? 'Start Recording' : 'Stop Recording'}
                </Button>
                {(recordingStatus === 'recorded') && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <audio controls src={recordedUrl} />
                    </Box>
                )}
                {(recordingStatus === 'recorded') && (receivedData) && (
                    <Button variant='contained' color='success' onClick={clickFinishInterview}>
                        Continue
                    </Button>
                )}
                {(recordingStatus === 'recorded') && !(receivedData) && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <CircularProgress />
                    </Box>

                )}
            </Box>
            <Box sx={{ width: '60%' }}>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    width='100%'
                    height='100%'
                    style={{ borderRadius: '8px' }}
                />
            </Box>
        </Paper>
    )
}

export default Interview
