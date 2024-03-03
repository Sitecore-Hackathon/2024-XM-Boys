export class JarvisClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseUrl = `${process.env.NEXT_PUBLIC_JARVIS_ENDPOINT}`;
    console.log(this.baseUrl);
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  get(url: string): Promise<any> {
    const requestOptions = {
      method: 'GET',
      headers: this.headers,
      redirect: 'follow'
    } as unknown as RequestInit;
    return fetch(this.baseUrl + url, requestOptions)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        throw new Error('Error in chat');
      });
  }

  post(url: string, body?: any): Promise<any> {
    const requestOptions = {
      method: 'POST',
      headers: this.headers,
      body: body ? JSON.stringify(body) : null,
      redirect: 'follow'
    } as unknown as RequestInit;
    return fetch(this.baseUrl + url, requestOptions)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        throw new Error('Error in chat');
      });
  }
}
