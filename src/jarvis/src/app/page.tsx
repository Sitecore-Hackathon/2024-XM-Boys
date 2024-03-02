'use client';

import styles from './page.module.css';
import React, { FormEvent, use } from 'react';
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
  Box
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
  const [selectedOption, setSelectedOption] = React.useState<OptionType>(null);
  const [options, setOptions] = React.useState([]);
  const [parent, setParent] = React.useState([]);
  const [itemNode, setItemNode] = React.useState<GroupedItems>({});
  const [context, setContext] = React.useState('');

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://a0cb-186-46-60-142.ngrok-free.app/api/templates');
        const data = await response.json();
        const formattedOptions = data.map((item: { id: string; name: string }) => ({
          value: item.id,
          label: item.name
        }));
        console.log(formattedOptions);
        setOptions(formattedOptions);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();

    setContext(localStorage.getItem('context') || '');
  }, []);

  React.useEffect(() => {
    const fetchParentId = async () => {
      if (options.length > 0) {
        // Make sure there are options available
        try {
          const response = await fetch(
            `https://a0cb-186-46-60-142.ngrok-free.app/api/items/parentOptions/${
              selectedOption?.value || options[0]?.value
            }`
          );
          const data = await response.json();
          const formattedOptions = data.map((item: { id: string; name: string }) => ({
            value: item.id,
            label: item.name
          }));
          setParent(formattedOptions);
          console.log('parent', parent);
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
    // const response = await fetch("/api/hello", {
    //     method: "POST",
    //     body: formData,
    // });
    console.log('submit');
  }

  function handleContextInput(event: React.FocusEvent<HTMLTextAreaElement>) {
    localStorage.setItem('context', event.target.value);
  }

  async function changeSelectTemplateHandler(option: OptionType) {
    setSelectedOption(option);
    const response = await fetch(
      `https://a0cb-186-46-60-142.ngrok-free.app/api/templates/${option?.value}`
    );
    const data = await response.json();
    const grouped = groupItemsBySection(data?.itemTemplate?.ownFields?.edges);
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
            <FormLabel>Select a Template</FormLabel>
            <Select
              selectedOptionStyle="check"
              onChange={changeSelectTemplateHandler}
              options={options}
              name="template"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Parent Id</FormLabel>
            <Select
              selectedOptionStyle="check"
              //   onChange={changeSelectHandler}
              options={parent}
              name="template"
            />
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
                          <Input name={item.node.name} />
                          <InputRightAddon padding="0">
                            <Button variant="ai" borderRadius="0" onClick={onOpen}>
                              <Icon>
                                <path d={mdiCreation} />
                              </Icon>
                              AI assistant
                            </Button>
                          </InputRightAddon>
                        </InputGroup>
                      ) : (
                        <div className={styles.textAreaContainer}>
                          <Textarea name={item.node.name} />
                          <Button
                            variant="ai"
                            borderRadius="0"
                            className={styles.aiButtonTextArea}
                            onClick={onOpen}
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
            <ModalHeader>Modal title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Enter Your Prompt Please</FormLabel>
                <Textarea value="Hola que hace" />
              </FormControl>
            </ModalBody>
            <ModalFooter className={styles.modalFooter}>
              <Button
                variant="ai"
                leftIcon={
                  <Icon>
                    <path d={mdiCreation} />
                  </Icon>
                }
              >
                Generate
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </main>
    </ChakraProvider>
  );
}
