"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { ChakraProvider } from "@chakra-ui/react";
import sitecoreTheme, { toastOptions } from "@sitecore/blok-theme";
import { Button, Wrap } from "@chakra-ui/react";

export default function Home() {
    return (
        <ChakraProvider theme={sitecoreTheme} toastOptions={toastOptions}>
            <main className={styles.main}>
                <nav className={styles.navbar}>
                    <Wrap align="center">
                        <Button variant="navigation">Navigation</Button>
                        <Button variant="navigation" isActive>
                            isActive
                        </Button>
                    </Wrap>
                </nav>
            </main>
        </ChakraProvider>
    );
}
