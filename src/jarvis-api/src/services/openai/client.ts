type Choice = {
    message: {
        role: string;
        content: string;
    };
};

export type Response = {
    id: string;
    choices: [Choice];
};

export class OpenAIClient {
    private baseUrl: string;
    private headers: Record<string, string>;

    constructor() {
        this.baseUrl = `${process.env.AZURE_OPEN_AI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPEN_AI_DEPLOYMENT_NAME}/chat/completions?api-version=${process.env.AZURE_OPEN_AI_API_VERSION}`;
        console.log(this.baseUrl);
        this.headers = {
            "Content-Type": "application/json",
            "Api-Key": `${process.env.AZURE_OPEN_AI_API_KEY}`,
        };
    }

    chat(payload: any): Promise<Response> {
        const requestOptions = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(payload),
            redirect: "follow",
        } as unknown as RequestInit;
        return fetch(this.baseUrl, requestOptions)
            .then((response) => response.text())
            .then((result) => JSON.parse(result) as Response)
            .catch((error) => {
                console.error(error);
                throw new Error("Error in chat");
            });
    }
}
