const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: '*' }));

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_TOKEN,
    })
);

app.post('/api/generate', async (req, res) => {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.userText,
        max_tokens: 1020,
        temperature: 0.6,
    });

    res.json({ text: completion.data.choices[0].text.trim() })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})