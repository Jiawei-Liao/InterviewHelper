import Papa from 'papaparse'

export async function fetchQuestion(type = '', seenQuestions = []) {
    try {
        const storedData = JSON.parse(localStorage.getItem('settingsData')) || {}
        const response = await fetch('./questions.csv')
        const csvText = await response.text()

        // If type is provided, only use that type
        const types = new Set()
        if (type) {
            types.add(type)
        // If there is no settings, add all types
        } else if (Object.keys(storedData).length === 0) {
            await new Promise((resolve) => {
                Papa.parse(csvText, {
                    skipEmptyLines: true,
                    header: true,
                    complete: (results) => {
                        results.data.forEach(row => {
                            if (row.type) {
                                types.add(row.type)
                            }
                        })
                        resolve()
                    }
                })
            })
        // Otherwise, use types selected in settings
        } else {
            for (const [key, value] of Object.entries(storedData)) {
                if (value === true && (key !== 'OpenAI API Key' || key !== 'True Random')) {
                    types.add(key)
                }
            }
        }
        
        const questionsList = []
        await new Promise((resolve) => {
            Papa.parse(csvText, {
                skipEmptyLines: true,
                header: true,
                complete: (results) => {
                    // True random off
                    if (Object.keys(storedData).length === 0 || storedData['True Random'] === false) {
                        const typesArray = Array.from(types)
                        const selectedType = typesArray[Math.floor(Math.random() * typesArray.length)]
                        
                        results.data.forEach(row => {
                            if (row.type === selectedType) {
                                questionsList.push(row)
                            }
                        })
                    // True random on
                    } else {
                        results.data.forEach(row => {
                            if (types.has(row.type)) {
                                questionsList.push(row)
                            }
                        })
                    }
                    resolve()
                }
            })
        })

        const filteredArray = questionsList.filter(item => !seenQuestions.includes(item.question))
        if (filteredArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredArray.length);
            return filteredArray[randomIndex];
        } else {
            console.error('No questions possible')
            return '';
        }
    } catch (error) {
        console.error('Error fetching question:', error)
        return ''
    }
}

export function saveInterviewReport(data) {
    localStorage.setItem('reportData', JSON.stringify(data))

}