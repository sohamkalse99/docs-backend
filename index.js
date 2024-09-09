const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Document = require("./models/document.models.js")
const {GoogleGenerativeAI} = require('@google/generative-ai');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require("cors")
dotenv.config();
app.use(express.json());
app.use(cors());
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
/*app.get("/gemini", async (req, res) => {
    try {
        // Make sure to include these imports:
        // import { GoogleGenerativeAI } from "@google/generative-ai";
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Write a story about a magic backpack.";

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        res.status(200).json(result.response.text())
    } catch (error) {
        console.error('Error fetching from Google Gemini API:', error);
        res.status(500).send('An error occurred while processing your request.');
    }   
});*/
app.get("/docs", async(req, res) => {
    try{
        const id = req.query.id;

        if(id!=null) {
            const doc = await Document.findById(id);
            res.status(200).json(doc);
        } else {
            const doc = await Document.find();
            res.status(200).json(doc);
        }
        

    } catch(error) {
        res.status(400).json({error : error.message});
    }

});


app.post("/docs", async (req, res) => {
    try{

        const doc = await Document.create(req.body);
        res.status(200).json(doc);
    }catch(error) {
        res.status(400).json({error: error.message});
    }

});

/*const axios = require('axios');

// Define your API key and endpoint
const apiKey = process.env.API_KEY;
const endpoint = 'https://gemini.googleapis.com/v1/models/gemini-1.5-flash:generateAnswer';

// Define the text and questions
const text = "Your text goes here.";
const questions = ["What is the main idea?", "Who is the author?"];

// Create the request payload
const payload = {
    contents: [{ text: text }],
    questions: questions,
    answerStyle: 'concise'
};

// Set the headers
const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
};

// Send the request
axios.post(endpoint, payload, { headers: headers })
    .then(response => {
        const answers = response.data.answers;
        questions.forEach((question, index) => {
            console.log(`Q: ${question}`);
            console.log(`A: ${answers[index].text}`);
        });
    })
    .catch(error => {
        console.error(`Error: ${error.response.status}`);
        console.error(error.response.data);
    });*/

mongoose
  .connect(
    "mongodb+srv://skalse:MPe58vqd7zDhhWeZ@augieraibackend.2ptqt.mongodb.net/Augier-AI?retryWrites=true&w=majority&appName=AugierAIBackend"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(5000, () => {
      console.log("server running on port 5000");
    });
  })
  .catch(() => {
    console.log("connection failed");
  });
