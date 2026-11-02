import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { problem, response } = req.body;

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: `
You are a supportive middle school math teacher.

Analyze the student's response and provide:

✅ Strengths

⚠️ Misconceptions

➡️ Next Step

Be encouraging and specific.
`,
          },
          {
            role: "user",
            content: `
Problem:
${problem}

Student Response:
${response}
`,
          },
        ],
      });

    res.status(200).json({
      feedback:
        completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      feedback:
        "AI feedback is currently unavailable.",
    });
  }
}