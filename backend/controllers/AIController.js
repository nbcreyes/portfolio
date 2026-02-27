import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const AIController = {
  async generateDraft(req, res) {
    try {
      const { topic, tone, length } = req.body;

      if (!topic) {
        return res.status(400).json({ error: 'Topic is required.' });
      }

      const prompt = `Write a blog post about: "${topic}".
Tone: ${tone || 'professional'}
Length: ${length || 'medium'} (short=300 words, medium=600 words, long=1000 words)

Respond in this exact JSON format with no extra text:
{
  "title": "the blog post title",
  "excerpt": "a one sentence summary",
  "body": "the full blog post content",
  "tags": ["tag1", "tag2", "tag3"]
}`;

      const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      });

      const raw = response.choices[0].message.content;
      const parsed = JSON.parse(raw);
      res.json(parsed);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default AIController;