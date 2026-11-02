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
   const { problem, response, role } =
  req.body;

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: `
You are an expert middle school math teacher
using Reciprocal Teaching strategies.

Evaluate the student's response based on
the assigned role.

Role Expectations:

🔮 Predictor:
Predict likely strategies and outcomes.

❓ Questioner:
Ask meaningful questions that deepen understanding.

🔍 Clarifier:
Identify confusion and explain difficult ideas.

📝 Summarizer:
Summarize the group's reasoning and solution.

Return EXACTLY these sections:

✅ Strengths

⚠️ Misconceptions

➡️ Next Step

Rules:
- Refer to the student's role.
- Do not praise incorrect mathematics.
- If the response is unrelated to the problem, say so.
- Be encouraging.
- Keep the response under 120 words.
`,
          },
          {
  role: "user",
  content: `
Problem:
${problem}

Student Role:
${role}

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