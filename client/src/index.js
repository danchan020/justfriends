import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import {store} from './store';
import { Provider } from 'react-redux'

const theme = extendTheme({
  colors : {
    primary: '#3A6436',
    secondary: '#EDE490',
    tertiary: '#D9D9D9'
  }
}) 

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>  
  </ChakraProvider>
);

