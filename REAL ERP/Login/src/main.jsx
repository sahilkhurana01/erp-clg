import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Login.jsx'
import Signup from './Signup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
    <Signup />
  </StrictMode>,
)
