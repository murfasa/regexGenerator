const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");

dotenv.config()

const configuration = new Configuration({
  apiKey : process.env.OPENAI_API_KEY,
})

//console.log(process.env.OPENAI_API_KEY)

const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
  res.status(200).send({
    message: 'Hello!',
  })
})

app.post('/', async(req, res) => {
  try {
    const prompt = req.body.prompt;
    // console.log(prompt);

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {role: "system", content: "You are a helpful regular expression generator."},
        {role: "system", content: "Only respond with a regular expression. Do not include extra words."},
        {role: "user", content: `${prompt}`}
      ],
      temperature: 0,
      max_tokens: 2000,
      top_p : 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    res.status(200).send({
      bot: response.data.choices[0].message.content,
      choices: response.data.choices
    })

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Error, something went wrong!');
  }
})

app.listen(5000, () => console.log('AI server started on https://regex.murfasa.com:5000'))