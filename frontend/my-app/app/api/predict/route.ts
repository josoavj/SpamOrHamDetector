import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { text, language } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text required' }, { status: 400 });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;

        // Fallback Mock if no key (though user said they added it)
        if (!apiKey) {
            console.warn("No OPENROUTER_API_KEY found. Using mock.");
            const isSpam = text.toLowerCase().includes('win') || text.toLowerCase().includes('gratuit');
            return NextResponse.json({
                label: isSpam ? 'SPAM' : 'HAM',
                score: isSpam ? 95 : 12,
                explanation: "Mock mode: Detected keywords."
            });
        }

        const prompt = `
      You are a Spam Detection System. Classify the following SMS/Message as 'SPAM' or 'HAM'.
      Respond ONLY with a valid JSON object. Do not add markdown formatting.
      Format:
      {
        "label": "SPAM" or "HAM",
        "score": number (0-100 confidence that it is the label),
        "explanation": "Brief explanation in ${language === 'FR' ? 'French' : 'Malagasy'} (max 1 sentence)."
      }

      Message to analyze: "${text}"
    `;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "SpamDetector"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.1-8b-instruct",
                messages: [
                    { role: "user", content: prompt }
                ]
            })
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("OpenRouter Error", err);
            throw new Error("OpenRouter API Error");
        }

        const data = await response.json();
        let content = data.choices[0].message.content;

        // Clean markdown if present
        content = content.replace(/```json/g, '').replace(/```/g, '').trim();

        const jsonResult = JSON.parse(content);
        return NextResponse.json(jsonResult);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
