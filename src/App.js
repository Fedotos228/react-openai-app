import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai';

import './App.css'

function App() {
    const configuration = new Configuration({
        organization: "org-NSgm9uRMro8cjfkkzBEiPWir",
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const [prompt, setPrompt] = useState('')
    const [result, setResult] = useState('')
    const [loading, setLoading] = useState(false);

    const handleClick = async() => {
        setLoading(true)
        try {
            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: prompt,
                temperature: 0.5,
                max_tokens: 1000,
            })
            setResult(response.data.choices[0].text)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return ( <
        main className = "main" >
        <
        h1 > TUDOR 's CHAT GPT</h1> <
        textarea type = 'text'
        value = { prompt }
        onChange = { e => setPrompt(e.target.value) }
        placeholder = 'Write your prompt..'
        className = 'textarea' >
        <
        /textarea> <
        button onClick = { handleClick }
        disabled = { loading || prompt.length === 0 }
        className = 'btn' >
        { loading ? 'Generating...' : 'Generate' } <
        /button> <
        pre className = 'result' > { result } < /pre> <
        /main>
    );
}

export default App;