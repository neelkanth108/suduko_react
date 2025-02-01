
import { useEffect, useState ,useRef} from 'react'
import './App.css'
import Board from './board'
import Button from './button'
import { ThemeToggle } from './ThemeToggle'
import SolutionBoard from './solutionBoard'
import StartPage from './StartPage/StartPage'
import GamePage from './GamePage/GamePage'

function App() {



  return (
    
      <Router>
        <div className="app">
          <Switch>
            <Route path="/" exact component={StartPage} />
            <Route path="game" component={GamePage} />
          </Switch>
        </div>
      </Router>
    
  )
}

export default App
