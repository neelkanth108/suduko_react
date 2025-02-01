import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "./contexts/ThemeContext"
import { GameContextProvider } from './contexts/gameContext.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import StartPage from './StartPage/StartPage.jsx'
import GamePage from './GamePage/GamePage.jsx'
const router = createBrowserRouter([
      {
            path:'/',
            element:<StartPage/>
      },
      {
            path:'game',
            element:<GamePage/>
      }
    
])

createRoot(document.getElementById('root')).render(
      
      <GameContextProvider>
            {/* <App /> */}
            <RouterProvider router={router}/>
       </GameContextProvider>
      // </RouterProvider>

)
