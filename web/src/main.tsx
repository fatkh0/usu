import * as React from 'react'
import { createRoot } from 'react-dom/client';

import { BrowserRouter} from "react-router-dom";
import { store } from "./redux/store";
import {Provider} from "react-redux";
import 'normalize.css';

import AppWrapper from './appWrapper/AppWrapper'

const App: React.FC = () => (
    <React.StrictMode>
      <BrowserRouter >
        <Provider store={store}>
            <AppWrapper />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
)

const container = document.getElementById('main') as HTMLElement
const root = createRoot(container);
root.render(<App />)
