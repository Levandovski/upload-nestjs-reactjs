import React from 'react';
import ReactDOM from 'react-dom/client';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import 'react-toastify/dist/ReactToastify.css';
import { persistor, store } from './store/configStore.ts';
import App from './App.tsx';
import { ThemeProvider } from '@mui/material/styles';

import { GlobalStyle } from './styles/global.ts';
import { themeMuiCustom } from './styles/theme/styleMui.ts';

if (import.meta.env.VITE_HOST !== 'DEV') {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={themeMuiCustom}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
