const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const query = req.body;
  console.log("query:", query);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Generate a multiple choice quiz with 4 questions about ${query}. Output in json.`,
    temperature: 0,
    max_tokens: 1000,
  });

  if (response.status === 200) {
    res.status(200).json({ msg: response.data.choices[0].text });
  } else {
    res.status(400).json({ message: "there was an error" });
  }
}


