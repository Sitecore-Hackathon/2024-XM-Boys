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
            dataSourceTemplates(input: { database: "master" }) {
                templates {
                    name
                    templateId
                }
            }
            customDatasourceTemplates: itemTemplates(
                where: {
                    database: "master"
                    path: "{77E925DF-92A5-49AE-B54A-C37CF62DD201}"
                }
            ) {
                nodes {
                    name
                    templateId
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
