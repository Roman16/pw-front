import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Rousting from './routers/routers';


function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <Rousting />
        </BrowserRouter>
      </Provider>

  );
}

export default App;
