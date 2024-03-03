import { gql } from "graphql-request";
import { GraphQLRequestClient } from "./client";

export const createItem = async (parentId: string, templateId: string, name: string, itemData: any) => {
    const graphQLClient = new GraphQLRequestClient(
        process.env.GRAPH_QL_ENDPOINT as string,
        {
            apiKey: process.env.GRAPH_QL_API_KEY as string,
            timeout: 30000,
        }
    );

    function stringifyWithoutQuotes(obj: any): string {
        if (Array.isArray(obj)) {
            return '[ ' + obj.map(stringifyWithoutQuotes).join(', ') + ' ]';
        } else if (typeof obj === 'object' && obj !== null) {
            let str = '{ ';
            for (let key in obj) {
                str += key + ': ' + JSON.stringify(obj[key]) + ', ';
            }
            return str.slice(0, -2) + ' }';
        } else {
            return JSON.stringify(obj);
        }
    }

    const query = gql`
    mutation createCallToActionRow($parent: ID!, $templateId: ID!, $name: String!) {
        createItem(input: {
            database: "master",
            language: "en",
            name: $name,
            parent: $parent,
            templateId: $templateId,
            fields: ${stringifyWithoutQuotes(itemData)}
        }) {
            item {
                itemId
            }
        }
    }
    `;

    try {
        const result = await graphQLClient.request(query, { parent: parentId, templateId: templateId, name: name });
        return result;
    } catch (e) {
        console.error(e);
    }
};

export const getParentOptions = async () => {
    const graphQLClient = new GraphQLRequestClient(
        process.env.GRAPH_QL_ENDPOINT as string,
        {
            apiKey: process.env.GRAPH_QL_API_KEY as string,
            timeout: 30000,
        }
    );

    const query = gql`
    query getParentOptions{
        item(where: {itemId: "{34B1378B-8B5C-4FC1-AFCE-EA907C1E981A}"}){
          children {
              nodes {
              name
              itemId
              insertOptions {
                templateId
              }
            }
          }
        }
      }
    `;

    try {
        const result: any = await graphQLClient.request(query);
        return result;
    } catch (e) {
        console.error(e);
    }
};