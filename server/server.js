import axios from "axios";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const port = 5000;

app.get("/", async (req, res) => {
  res.send({ message: "Hello from chatGpt by Taleem" });
});

app.post("/", async (req, res) => {
  try {
    const message = req.body.message;
    const options = {
      method: "POST",
      url: "https://chatgpt53.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.VITE_RAPIDAPI_API_KEY,
        "X-RapidAPI-Host": "chatgpt53.p.rapidapi.com",
      },
      data: {
        messages: [
          {
            role: "user",
            content: `${message}`,
          },
        ],
      },
    };

    const response = await axios.request(options);
    res.status(200).send({ ai: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`server is listening on port http://localhost:${port}`);
});
