import React from 'react'

import { useEffect, useState ,useRef} from 'react'
import { createContext } from 'react'
export const GameContext = createContext();
export const GameContextProvider = ({children}) => {
  
  let initialBoard = [[],[],[],[],[],[],[],[],[]]
  const emptyBoard = Array(9).fill().map(() => Array(9).fill(" "));
   let [board,setBoard] = useState(emptyBoard);
   let [inputboard,setInputboard] = useState(emptyBoard);
   let [solvedBoard,setSolvedBoard]=useState(null);
   const [initialState, setInitialState] = useState(emptyBoard);
   let [time,setTime] = useState(0);
   const [isModalOpen, setIsModalOpen] = useState(false);
   let [showboard,setShowboard] = useState(null);
   const [text,setText] = useState("");
   let [row,setRow] = useState(-1);
  let [col,setCol] = useState(-1);
  const [isRunning, setIsRunning] = useState(true);
  let[difficulty,setDifficulty] = useState("");
  // let [isdark,setIsdark] = useState(false);
  let [win,setWin] = useState(false);
  let [show,setShow] = useState(false);
  const inputRefs = useRef([]);
  let[sel,setSel] = useState(false)



   useEffect(()=>{
    generateBoard();
    setTime(0)
  },[sel])
  
  useEffect(()=>{
    let interval;
    if(isRunning)
    {
      interval = setInterval(()=>{
        setTime(prev=>prev+1);
      },1000);
    }
    else if(!isRunning && time!==0){
      clearInterval(interval);
    }
    return()=>clearInterval(interval);
    
  },[isRunning,time])
  
   useEffect(()=>{
    if(solvedBoard)
        checkSolution();
   },[solvedBoard])
  
  useEffect(() => {
    if (inputRefs.current[row] && inputRefs.current[row][col]) {
      inputRefs.current[row][col].focus();
    }
  }, [row, col]);
  
  
  async function generateBoard()
  {
   let response = await fetch("https://sudoku-api.vercel.app/api/dosuku");
   let data = await response.json();
   // console.log(data)
   let dataarr =data.newboard.grids[0].value;
   initialBoard=([...dataarr])
   setBoard([...dataarr]);
   setInputboard([...dataarr]);
   setInitialState([...dataarr]);
   console.log("initialState: ",initialState)
   setDifficulty(data.newboard.grids[0].difficulty)
 
  }
  
  function isValid(c,row,col,board)
  {
    for(let i=0;i<9;i++)
    {
      if(board[i][col]===c)
        return false;
      if(board[row][i]===c)
        return false;
      if(board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + (i % 3)] === c)
        return false;
    }
    return true;
  }
  function solvethesuduko(board)
  {
      for(let i=0;i<9;i++)
      {
        for(let j=0;j<9;j++)
        {
          if(board[i][j]===0)
          {
            for(let c =1;c<=9;c++)
            if(isValid(c,i,j,board))
            {
              board[i][j]=c;
              if(solvethesuduko(board))
              {
                return true;
              }
              else{
                board[i][j]=0;
              }
  
            }
            return false;
          }
        }
      }
      return true;
   }
  
  function getsolved()
  {
    const boardCopy = JSON.parse(JSON.stringify(board)); // taking a deep copy of the board
   if(solvethesuduko(boardCopy))
   {
    // setInputboard(boardCopy);
    setSolvedBoard(boardCopy)
    // console.log("Answer board:",boardCopy);
    console.log("rendered board:",solvedBoard);
   }
   else{
    console.log("No Solution found.")
   }
  
  }
  function checkfunction()
  {
    if (!solvedBoard) {
      getsolved();
    }else{
      checkSolution();
    }
  
  }
  
  
  function checkSolution() {
    openModal();
    if (!solvedBoard) {
      console.log("No solution available to check against.");
      setText("No solution available to check against.");
      return false;
    }
  
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (inputboard[i][j] !== solvedBoard[i][j]) {
          setText("Incorrect Answer");
          setWin(false);
          return false;
        }
      }
    }
    setText("Congratulations !!");
    setWin(true);
    pauseStopwatch();
    return true;
  }
  const takeinput=(row,col,inputboard,val)=>{
    // console.log("takeClicked");
    const newBoard = inputboard.map((r, rIndex) =>
      r.map((c, cIndex) => (rIndex === row && cIndex === col ? (val === "" || val === c ? "" : parseInt(val)) : c))
    );
    setInputboard(newBoard);
  }
  
  
  const startStopwatch = () => {
    setIsRunning(true);
  };
  
  const pauseStopwatch = () => {
    setIsRunning(false);
  };
  
  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
  };
  
  
    // Function to open the modal
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    // Function to close the modal
    const closeModal = () => {
      setIsModalOpen(false);
      if(win)
        nextpuzzle();
    };
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
   async function  nextpuzzle()
    {
      generateBoard();
      setShow(false);
      setTime(0)
      startStopwatch()
    }
   
    function clearinputs()
    {
      setInputboard(board);
      
    }
    function showsolved()
  {
    const boardCopy = JSON.parse(JSON.stringify(board)); // taking a deep copy of the board
   if(solvethesuduko(boardCopy))
   {
    // setInputboard(boardCopy);
    setShowboard(boardCopy)
    // console.log("Answer board:",boardCopy);
    console.log("rendered board:",showboard);
   }
   else{
    console.log("No Solution found.")
   }
  
  }
    function ShowSolution()
    {
      showsolved();
      setShow(true);
  
    }
  const moveFocus = (direction) => {
      switch (direction) {
        case 'up':
          setRow((prevRow) => (prevRow > 0 ? prevRow - 1 : prevRow));
          break;
        case 'down':
          setRow((prevRow) => (prevRow < 8 ? prevRow + 1 : prevRow));
          break;
        case 'left':
          setCol((prevCol) => (prevCol > 0 ? prevCol - 1 : prevCol));
          break;
        case 'right':
          setCol((prevCol) => (prevCol < 8 ? prevCol + 1 : prevCol));
          break;
        default:
          break;
      }
    };
    
  return <GameContext.Provider value={{
    initialBoard,            
    emptyBoard,
    board,
    setBoard,
    inputboard,
    setInputboard,
    solvedBoard,
    setSolvedBoard,
    initialState,
    setInitialState,
    time,
    setTime,
    isModalOpen,
    setIsModalOpen,
    showboard,
    setShowboard,
    text,
    setText,
    row,
    setRow,
    col,
    setCol,
    isRunning,
    setIsRunning,
    difficulty,
    setDifficulty,
    win,
    setWin,
    show,
    setShow,
    inputRefs,
    generateBoard,
    isValid,
    solvethesuduko,
    moveFocus,
    ShowSolution,
    showsolved,
    clearinputs,
    takeinput,
    startStopwatch,
    pauseStopwatch,
    resetStopwatch,
    openModal,
    closeModal,
    formatTime,
    nextpuzzle,
    checkSolution,
    checkfunction,
    getsolved,
    sel,
    setSel
    }}
    >
    {children}
   </GameContext.Provider>
  
}


