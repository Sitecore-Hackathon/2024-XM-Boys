"use client";

import styles from "./page.module.css";
import React from "react";
import {
    ChakraProvider,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import sitecoreTheme, { toastOptions } from "@sitecore/blok-theme";
import {
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
} from "@chakra-ui/react";
import {
    mdiDotsGrid,
    mdiWarehouse,
    mdiChevronRight,
    mdiDatabase,
    mdiInbox,
    mdiCreation,
} from "@mdi/js";

export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState("md");

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
                            aria-label={"Switch to…"}
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
                                aria-label={"Switch to…"}
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
                <div className={styles.formContainer}>
                    <FormControl>
                        <FormLabel>Input</FormLabel>
                        <Input />
                        <Button
                            variant="ai"
                            onClick={onOpen}
                            leftIcon={
                                <Icon>
                                    <path d={mdiCreation} />
                                </Icon>
                            }
                        >
                            AI assistant
                        </Button>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Textarea</FormLabel>
                        <Textarea />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Primary CTA</FormLabel>
                        <Input type="text" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Secondary CTA</FormLabel>
                        <Input type="text" />
                    </FormControl>
                </div>
                <div className={styles.ctaContainer}>
                    <Button variant="solid" shadow="md">
                        Create Component
                    </Button>
                </div>
                <Modal size={"md"} onClose={onClose} isOpen={isOpen}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Enter Your Prompt Please</FormLabel>
                                <Textarea />
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
