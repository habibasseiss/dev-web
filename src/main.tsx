import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import { Pagina2, Pagina3, Pagina4 } from './Paginas.tsx';
import { Layout } from './Layout.tsx';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/pagina-2" element={<Pagina2 />} />
          <Route path="/pagina-3" element={<Pagina3 />} />
          <Route path="/pagina-4" element={<Pagina4 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
