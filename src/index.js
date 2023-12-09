import './index.css';
import React from 'react';
/* import { Provider } from 'react-redux'; */
import ReactDOM from 'react-dom/client';
import App from './App';
/* import { persistor, store } from 'redux/store'; */
import { BrowserRouter } from 'react-router-dom';
/* import { PersistGate } from 'redux-persist/integration/react'; */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/rent-auto">
      {/* <Provider store={store}>
        <PersistGate persistor={persistor}> */}
          <App />
      {/*   </PersistGate>
      </Provider> */}
    </BrowserRouter>
  </React.StrictMode>
);