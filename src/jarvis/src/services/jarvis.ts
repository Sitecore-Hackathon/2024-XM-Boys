import { JarvisClient } from './jarvis-client';

export const getTemplates = async () => {
  try {
    const client = new JarvisClient();
    const response = await client.get('/api/templates');
    const formattedOptions = response.map((item: { id: string; name: string }) => ({
      value: item.id,
      label: item.name
    }));
    return formattedOptions;
  } catch (error) {
    console.error('Failed to fetch items:', error);
  }
};

export type TemplateInformation = {
  itemTemplate: {
    name: string;
    templateId: string;
    ownFields: {
      edges: {
        node: {
          name: string;
          title: string;
          section: {
            name: string;
          };
          type: string;
        };
      }[];
    };
  };
} | null;

export const getTemplate = async (templateId: string): Promise<TemplateInformation> => {
  try {
    const client = new JarvisClient();
    const response = await client.get('/api/templates/' + templateId);
    return response as TemplateInformation;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    throw new Error('Failed to fetch template');
  }
};

export const getParentId = async (templateId: string) => {
  try {
    const client = new JarvisClient();
    const response = await client.get('/api/items/parentOptions/' + templateId);
    const formattedOptions = response.map((item: { id: string; name: string }) => ({
      value: item.id,
      label: item.name
    }));
    return formattedOptions;
  } catch (error) {
    console.error('Failed to fetch items:', error);
  }
};

type GenerateContentResponse = {
  fieldContent: string;
};

export const generateContent = async (
  context: string,
  prompt: string,
  fieldType: string
): Promise<GenerateContentResponse> => {
  try {
    const client = new JarvisClient();
    const response = await client.post('/api/ai', {
      context: context,
      prompt: prompt,
      fieldType: fieldType
    });
    return response as GenerateContentResponse;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    throw new Error('Failed to generate content');
  }
};

export type ItemData = {
  name: string;
  value: string;
};

export const createItemInSitecore = async (
  parentId: string,
  templateId: string,
  name: string,
  itemData: ItemData[]
): Promise<any> => {
  try {
    const client = new JarvisClient();
    const response = await client.post('/api/items', {
      parentId,
      templateId,
      name,
      itemData
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    throw new Error('Failed to generate content');
  }
};
