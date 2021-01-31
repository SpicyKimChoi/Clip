import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/pages/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';
import { ChakraProvider } from "@chakra-ui/react"



const store = createStore(rootReducer)

ReactDOM.render(

  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider >,
  document.getElementById('root')
);


