import { OpenAIClient } from "./client";

export const fetchContent = async (
    context: string,
    prompt: string,
    fieldType: string
) => {
    const client = new OpenAIClient();
    const payload = {
        messages: [
            {
                role: "system",
                content:
                    "You are an AI assistant that generates content for a company website.",
            },
            {
                role: "user",
                content: `CONTEXT: ${context}`,
            },
            {
                role: "assistant",
                content: "Hello! How can I assist you today?",
            },
            {
                role: "user",
                content: `Using latest CONTEXT,Take into a account that field type is ${fieldType}. Resolve the folling prompt ${prompt} and just give me the text wihtout any politeness.`,
            },
        ],
        temperature: 0.7,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 800,
        stop: null,
        stream: false,
    };
    try {
        const openAIResponse = await client.chat(payload);
        const choice = openAIResponse.choices[0];
        return {
            fieldContent: choice.message.content,
        };
    } catch (e) {
        return {
            error: e,
        };
    }
};
