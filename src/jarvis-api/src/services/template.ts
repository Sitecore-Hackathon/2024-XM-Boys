import { gql } from "graphql-request";
import { GraphQLRequestClient } from "./client";

export const getTemplates = async () => {
    const graphQLClient = new GraphQLRequestClient(
        process.env.GRAPH_QL_ENDPOINT as string,
        {
            apiKey: process.env.GRAPH_QL_API_KEY as string,
            timeout: 30000,
        }
    );

    const query = gql`
        query getTemplates {
            customDatasourceTemplates: search(
                query: {
                    searchStatement: {
                        criteria: [
                            {
                                operator: MUST
                                field: "__base_template_sm"
                                value: "166a7c8b6a8c4c6db1b0f46c27ba22fc"
                            }
                            { operator: MUST, field: "_language", value: "en" }
                        ]
                    }
                }
            ) {
                results {
                    name
                    templateId: itemId
                }
            }
        }
    `;

    try {
        const result = await graphQLClient.request(query);
        return result;
    } catch (e) {
        console.error(e);
    }
};

export const getTemplate = async (templateId: string) => {
    const graphQLClient = new GraphQLRequestClient(
        process.env.GRAPH_QL_ENDPOINT as string,
        {
            apiKey: process.env.GRAPH_QL_API_KEY as string,
            timeout: 30000,
        }
    );

    const query = gql`
        query getTemplateInfo($templateId: ID!, $language: String!) {
            itemTemplate(
                where: { database: "master", templateId: $templateId }
            ) {
                name
                templateId
                ownFields {
                    edges {
                        node {
                            name
                            title(language: $language)
                            section {
                                name
                            }
                            type
                        }
                    }
                }
            }
        }
    `;

    try {
        const result = await graphQLClient.request(query, {
            templateId: templateId,
            language: "en",
        });
        return result;
    } catch (e) {
        console.error(e);
    }
};
