import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppUIProvider } from "./context/AppUIContext"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppUIProvider>
      <App />
    </AppUIProvider>
  </StrictMode>

)
