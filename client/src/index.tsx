import React from "react";
import ReactDOM from "react-dom";
import App from "./components/pages/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./modules";
import { ChakraProvider } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ChakraProvider>
  </Provider>,
  document.getElementById("root"),
);
