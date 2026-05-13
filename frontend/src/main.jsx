import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { FruitContextApi } from './Context/FruitContextApi.jsx'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FruitContextApi>
      <App />
    </FruitContextApi>
  </BrowserRouter>
);
