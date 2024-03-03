import { GraphQLClient as Client, ClientError } from "graphql-request";
import { DocumentNode } from "graphql";
import parse from "url-parse";
import * as debuggers from "../debug";
import TimeoutPromise from "./utils/tiemout-promise";

type GraphQLRequestClientConfig = {
    apiKey?: string;
    timeout?: number;
    fetch?: typeof fetch;
    debugger?: debuggers.Debugger;
};

/**
 * An interface for GraphQL clients for Content Hub APIs
 */
export interface GraphQLClient {
    /**
     * Execute graphql request
     * @param {string | DocumentNode} query graphql query
     * @param {Object} variables graphql variables
     */
    request<T>(
        query: string | DocumentNode,
        variables?: {
            [key: string]: unknown;
        }
    ): Promise<T>;
}

export class GraphQLRequestClient implements GraphQLClient {
    private client: Client;
    private headers: Record<string, string> = {};
    private debug: debuggers.Debugger;
    private abortTimeout?: TimeoutPromise;
    private timeout?: number;

    /**
     * Provides ability to execute graphql query using given `endpoint`
     * @param {string} endpoint The Graphql endpoint
     * @param {GraphQLRequestClientConfig} [clientConfig] GraphQL request client configuration.
     */
    constructor(
        private endpoint: string,
        clientConfig: GraphQLRequestClientConfig = {}
    ) {
        if (clientConfig.apiKey) {
            this.headers["Authorization"] = `Bearer ${clientConfig.apiKey}`;
        }

        if (!endpoint || !parse(endpoint).hostname) {
            throw new Error(`Invalid GraphQL endpoint '${endpoint}'.`);
        }

        this.timeout = clientConfig.timeout;
        this.client = new Client(endpoint, {
            headers: this.headers,
            fetch: clientConfig.fetch,
        });
        this.debug = clientConfig.debugger || debuggers.default.http;
    }

    /**
     * Execute graphql request
     * @param {string | DocumentNode} query graphql query
     * @param {Object} variables graphql variables
     */
    async request<T>(
        query: string | DocumentNode,
        variables?: { [key: string]: unknown }
    ): Promise<T> {
        return new Promise((resolve, reject) => {
            // Note we don't have access to raw request/response with graphql-request
            // (or nice hooks like we have with Axios), but we should log whatever we have.
            this.debug("request: %o", {
                url: this.endpoint,
                headers: this.headers,
                query,
                variables,
            });

            const fetchWithOptionalTimeout = [
                this.client.request(query, variables),
            ];
            if (this.timeout) {
                this.abortTimeout = new TimeoutPromise(this.timeout);
                fetchWithOptionalTimeout.push(this.abortTimeout.start);
            }
            Promise.race(fetchWithOptionalTimeout).then(
                (data: unknown) => {
                    this.abortTimeout?.clear();
                    this.debug("response: %o", data);
                    resolve(data as T);
                },
                (error: ClientError) => {
                    this.abortTimeout?.clear();
                    this.debug(
                        "response error: %o",
                        error.response || error.message || error
                    );
                    reject(error);
                }
            );
        });
    }
}
