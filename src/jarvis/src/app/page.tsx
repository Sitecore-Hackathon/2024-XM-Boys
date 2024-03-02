'use client';

import styles from './page.module.css';
import React, { FormEvent, useEffect, useState } from 'react';
import { ItemData } from '@/services/jarvis';
import {
  ChakraProvider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  InputRightAddon,
  InputGroup,
  Tooltip,
  Icon,
  IconButton,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  useDisclosure,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Wrap
} from '@chakra-ui/react';
import { AsyncCreatableSelect, AsyncSelect, CreatableSelect, Select } from 'chakra-react-select';
import sitecoreTheme, { toastOptions } from '@sitecore/blok-theme';
import {
  mdiDotsGrid,
  mdiWarehouse,
  mdiChevronRight,
  mdiDatabase,
  mdiInbox,
  mdiCreation
} from '@mdi/js';
import {
  getParentId,
  getTemplate,
  getTemplates,
  generateContent,
  createItemInSitecore
} from '@/services/jarvis';

type OptionType = { label: string; value: string } | null;
interface ItemNode {
  node: {
    title: string;
    name: string;
    type: string;
    section: {
      name: string;
    };
  };
}

// Define the type for the grouped items
interface GroupedItems {
  [sectionName: string]: ItemNode[];
}

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState<OptionType>(null);
  const [options, setOptions] = useState([]);
  const [parent, setParent] = useState([]);
  const [itemNode, setItemNode] = useState<GroupedItems>({});
  const [initialData, setInitialData] = useState([]);
  const [context, setContext] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [prompt, setPrompt] = useState('');
  const [currentFieldName, setCurrentFieldName] = useState('');
  const [promptResponse, setPromptResponse] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const formattedOptions = await getTemplates();
        setOptions(formattedOptions);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();

    setContext(localStorage.getItem('context') || '');
  }, []);

  useEffect(() => {
    const fetchParentId = async () => {
      if (options.length > 0) {
        // Make sure there are options available
        try {
          const formattedOptions = await getParentId(selectedOption?.value || options[0]?.value);
          setParent(formattedOptions);
        } catch (error) {
          console.error('Failed to fetch parent options:', error);
        }
      }
    };

    fetchParentId();
  }, [options, selectedOption]); // Only re-run the effect if `options` or `selectedOption` changes

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const entriesObject = Object.fromEntries(formData);
    const initialDataToCompare = initialData?.itemTemplate?.ownFields?.edges.map(
      (item: { node: { name: any; type: any } }) => {
        return { name: item.node.name, type: item.node.type };
      }
    );

    const filteredEntries = Object.entries(entriesObject).filter(
      ([key, _]) => !['name', 'parentId', 'templateId', 'Please provide a context'].includes(key)
    );
    const resultArray = filteredEntries.map(([key, value]) => {
      let dataItem = initialDataToCompare.filter((data: { name: string }) => data.name === key)[0];
      if (dataItem.type === 'General Link') {
        value = `<link text='${value}' linktype='external' url='https://www.google.com' anchor='' target='' />`;
      }

      return { name: key, value: value } as ItemData;
    });


    const response = await createItemInSitecore(
      formData.get('parentId') as string,
      formData.get('templateId') as string,
      formData.get('name') as string,
      resultArray
    );

    console.log(response);
  }

  function handleContextInput(event: React.FocusEvent<HTMLTextAreaElement>) {
    localStorage.setItem('context', event.target.value);
  }

  async function changeSelectTemplateHandler(option: OptionType) {
    setSelectedOption(option);
    const response = await getTemplate(option?.value as string);
    setInitialData(response);
    const grouped = groupItemsBySection(response?.itemTemplate?.ownFields?.edges);
    setItemNode(grouped);
  }

  function groupItemsBySection(items: ItemNode[]): GroupedItems {
    return items.reduce((acc, item) => {
      const sectionName = item.node.section.name;
      if (!acc[sectionName]) {
        acc[sectionName] = [];
      }
      acc[sectionName].push(item);
      return acc;
    }, {} as GroupedItems);
  }

  async function generateContentHandler() {
    try {
      const response = await generateContent(context, prompt, fieldType);
      setPromptResponse(response.fieldContent);
    } catch (error) {
      console.error('Failed to generate content:', error);
    }
  }

  function handleUseGeneratedContent() {
    const input = document.querySelector(`input[name="${currentFieldName}"]`);
    if (input) {
      input.setAttribute('value', promptResponse);
    }
    const textArea = document.querySelector(`textarea[name="${currentFieldName}"]`);
    if (textArea) {
      (textArea as HTMLInputElement).value = promptResponse;
    }
    onClose();
  }

  return (
    <ChakraProvider theme={sitecoreTheme} toastOptions={toastOptions}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Tooltip label="Switch to…">
            <IconButton
              variant="ghost"
              size="sm"
              icon={
                <Icon>
                  <path d={mdiDotsGrid} />
                </Icon>
              }
              aria-label={'Switch to…'}
              className="js-my-switcher-button"
            />
          </Tooltip>
          <div className={styles.headerLeftBredcrumbs}>
            <Tooltip label="Switch to…">
              <IconButton
                variant="ghost"
                size="sm"
                icon={
                  <Icon>
                    <path d={mdiWarehouse} />
                  </Icon>
                }
                aria-label={'Switch to…'}
                className="js-my-switcher-button"
              />
            </Tooltip>

            <Icon>
              <path d={mdiChevronRight} />
            </Icon>
            <Image
              className={styles.headerIcon}
              src="https://i.ibb.co/4ThMXGB/jarvis-Icon.webp"
              alt="icon"
            />
          </div>
        </div>
        <div className={styles.headerRight}>
          <Tooltip label="Project Name">
            <div className={styles.headerBadge}>
              <Icon>
                <path d={mdiInbox} />
              </Icon>
              <span>Jarvis</span>
            </div>
          </Tooltip>
          <Tooltip label="Environment">
            <div className={styles.headerBadge}>
              <Icon>
                <path d={mdiDatabase} />
              </Icon>
              <span>Dev</span>
            </div>
          </Tooltip>
        </div>
      </header>
      <main className={styles.main}>
        <Text fontSize="4xl"> Create a new component</Text>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <FormControl paddingBlockStart="4">
            <FormLabel>Please Provide a Context</FormLabel>
            <Textarea
              name="Please provide a context"
              defaultValue={context}
              onBlur={handleContextInput}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" />
          </FormControl>
          <FormControl>
            <FormLabel>Select a Template</FormLabel>
            <Select
              selectedOptionStyle="check"
              onChange={changeSelectTemplateHandler}
              options={options}
              name="templateId"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Parent Id</FormLabel>
            <Select selectedOptionStyle="check" options={parent} name="parentId" required />
          </FormControl>
          {Object.entries(itemNode).map(([sectionName, items]) => (
            <Accordion allowToggle key={sectionName} className={styles.accordion}>
              <AccordionItem key={sectionName}>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {sectionName}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  {items.map((item, index) => (
                    <FormControl key={index}>
                      <FormLabel>{item.node.title}</FormLabel>
                      {item.node.type !== 'Rich Text' ? (
                        <InputGroup>
                          <Input
                            name={item.node.name}
                            key={item.node.name}
                            data-type={item.node.type}
                            required
                          />
                          <InputRightAddon className="inputRightAddon" padding="0">
                            <Button
                              variant="ai"
                              borderTopLeftRadius="0"
                              borderBottomLeftRadius="0"
                              borderTopRightRadius="6px"
                              borderBottomRightRadius="6px"
                              className="aiButtonInputType"
                              onClick={() => {
                                setFieldType(item.node.type);
                                setCurrentFieldName(item.node.name);
                                onOpen();
                              }}
                            >
                              <Icon>
                                <path d={mdiCreation} />
                              </Icon>
                              AI assistant
                            </Button>
                          </InputRightAddon>
                        </InputGroup>
                      ) : (
                        <div className={styles.textAreaContainer}>
                          <Textarea name={item.node.name} borderRadius="0"  required />
                          <Button
                            variant="ai"
                            borderRadius="0"
                            className={styles.aiButtonTextArea}
                            data-type={item.node.type}
                            onClick={() => {
                              setFieldType(item.node.type);
                              setCurrentFieldName(item.node.name);
                              onOpen();
                            }}
                            leftIcon={
                              <Icon>
                                <path d={mdiCreation} />
                              </Icon>
                            }
                          >
                            AI assistant
                          </Button>
                        </div>
                      )}
                    </FormControl>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))}
          <div className={styles.ctaContainer}>
            <Button type="submit" variant="solid" shadow="md">
              Create Component
            </Button>
          </div>
        </form>
        <Modal size={'md'} onClose={onClose} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{fieldType}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Enter Your Prompt Please</FormLabel>
                <Textarea
                  onChange={event => {
                    setPrompt(event.target.value);
                  }}
                  defaultValue="Enter a Prompt please!"
                />
              </FormControl>
              <Alert marginBlockStart={4}>
                <AlertIcon />
                <Wrap>
                  <AlertTitle>Generated Content</AlertTitle>
                  <AlertDescription>
                    {promptResponse === '' ? 'No content generated yet' : promptResponse}
                  </AlertDescription>
                </Wrap>
              </Alert>
            </ModalBody>
            <ModalFooter className={styles.modalFooter}>
              <Button
                variant="ai"
                onClick={generateContentHandler}
                leftIcon={
                  <Icon>
                    <path d={mdiCreation} />
                  </Icon>
                }
              >
                Generate
              </Button>
              <Button onClick={handleUseGeneratedContent}>Use</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </main>
    </ChakraProvider>
  );
}
