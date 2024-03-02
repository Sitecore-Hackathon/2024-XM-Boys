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

export const getTemplate = async (templateId: string) => {
  try {
    const client = new JarvisClient();
    const response = await client.get('/api/templates/' + templateId);
    return response;
  } catch (error) {
    console.error('Failed to fetch items:', error);
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
