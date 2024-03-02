import sitecoreTheme, { toastOptions } from '@sitecore/blok-theme';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const { ...props } = pageProps;
  return (
    <>
      {/*
        // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
        // Note Next.js does not (currently) provide anything for translation, only i18n routing.
        // If your app is not multilingual, next-localization and references to it can be removed.
      */}

      <ChakraProvider theme={sitecoreTheme} toastOptions={toastOptions}>
        <Component {...props} />
      </ChakraProvider>
    </>
  );
}

export default App;
