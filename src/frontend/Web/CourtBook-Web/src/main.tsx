import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './routes/routes'
import GlobalStyle from './global'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <GlobalStyle/>
  </React.StrictMode>,
)
