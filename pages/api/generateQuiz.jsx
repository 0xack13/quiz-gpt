const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const quizDataExample = {
  quiz: {
    title: "Legend of Zelda Quiz",
    questions: [
      {
        question:
          "What is the name of the main character in the Legend of Zelda series?",
        options: ["Link", "Mario", "Samus", "Kirby"],
        answer: "Link",
      },
      {
        question:
          "What is the name of the main antagonist in the Legend of Zelda series?",
        options: ["Ganondorf", "Bowser", "Ridley", "King K. Rool"],
        answer: "Ganondorf",
      },
      {
        question:
          "What is the name of the first game in the Legend of Zelda series?",
        options: [
          "The Legend of Zelda: Ocarina of Time",
          "The Legend of Zelda: A Link to the Past",
          "The Legend of Zelda",
          "The Legend of Zelda: Majora's Mask",
        ],
        answer: "The Legend of Zelda",
      },
      {
        question:
          "What is the name of the item used to defeat Ganon in the Legend of Zelda series?",
        options: ["Master Sword", "Triforce", "Hylian Shield", "Boomerang"],
        answer: "Master Sword",
      },
    ],
  },
};

const quizDataString = JSON.stringify(quizDataExample, null, 2);

export default async function handler(req, res) {
  const query = req.body;
  console.log("query:", query);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    //prompt: `Generate a multiple choice quiz with 4 questions about ${query}. Output in json.`,
    prompt: `Generate a multiple choice quiz with 4 questions about ${query}. Output in json. Here is an example: ${quizDataString}`,
    temperature: 0,
    max_tokens: 1000,
  });

  if (response.status === 200) {
    res.status(200).json({ msg: response.data.choices[0].text });
  } else {
    res.status(400).json({ message: "there was an error" });
  }
}
