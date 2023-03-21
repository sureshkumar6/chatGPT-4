import express from "express";
import {Configuration, OpenAIApi} from 'openai'

const OPENAI_API_KEY = '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' //API Key

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app= express()
app.use(express.json())

app.get('/', (req, resp)=>{
    resp.json({
        message:"test",
    })
})

app.post('/chat', (req,resp)=>{
  let question = req.body.question
  openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 7,
    temperature: 0,
  }).then(response=>{return(response.data.choices[0].text)})
    .then(answer=>{resp.json({
      question,
      "answer": answer,
    })})
})

app.post('/image', (req,resp)=>{
  let userInput = req.body.userInput
  openai.createImage({
    prompt: userInput,
    n: 1,
    size: "1024x1024",
}).then(response=>{return(response.data.data[0].url)})
  .then(answer=>{resp.json({
    userInput,
    "Link": answer,
  })})
})


app.listen(6000, ()=>{
    console.log('server is listening on PORT 6000')
})