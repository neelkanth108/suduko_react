import React, { useContext } from 'react'
import { GameContext } from '../contexts/gameContext'
import Board from '../board'
import SolutionBoard from '../solutionBoard'
import { NavLink } from 'react-router'

const GamePage = () => {
    const {
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
}=  useContext(GameContext)

const changeSel=()=>{
    setSel(false);
}


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      
      
    <div className='flex flex-wrap justify-center gap-3 items-center mb-4'>

      <h2 className='text-2xl sm:text-4xl font-bold'>{formatTime(time)}</h2>
      <div className="flex gap-2 flex-wrap justify-center">
      <button onClick={startStopwatch} className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 text-2xl">
        Start
      </button>
      <button onClick={pauseStopwatch} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 text-2xl">
        Pause
      </button>
      <button onClick={resetStopwatch} className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-2xl">
        Reset
      </button>
      </div>
    </div>

    <div className="m-2">
      <h3 className="text-xl sm:text-2xl font-bold">Difficulty: {difficulty}</h3>
    </div>


  
  <div className= {`w-full max-w-md ${isRunning?'':'pointer-events-none '}`  }>
        <Board board={inputboard} initialState={initialState} setInputboard={setInputboard} getrow={setRow} getcol={setCol} isValid ={isValid} inputRefs={inputRefs} focusedRow={row}
        focusedCol={col}/>
        
   </div>

  <div className='flex flex-col items-center justify-center'>

      <div className="grid grid-cols-4 gap-2 mb-3 mt-3">
        <button onClick={() => moveFocus('up')} className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 text-xl">
          Up
        </button>
        <button onClick={() => moveFocus('down')} className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 text-xl">
          Down
        </button>
        <button onClick={() => moveFocus('left')} className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 text-xl">
          Left
        </button>
        <button onClick={() => moveFocus('right')} className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 text-xl">
          Right
        </button>
      </div>
    <div className="grid grid-cols-3 gap-2 mb-4 mt-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <button
        key={number}
        className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 text-white font-bold rounded text-xl sm:text-3xl"
        
        onClick={() => takeinput(row,col,inputboard,number)}
        >
          {number}
        </button>
      ))}
     
    </div>
    </div>
    <div className='flex items-center gap-5 w-auto flex-row flex-wrap justify-center'>
      <button  onClick={checkfunction}  className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xl sm:text-3xl mt-2 sm:mt-4">
        Check
      </button>
      <button  onClick={clearinputs}  className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xl sm:text-3xl mt-2 sm:mt-4">
        Clear
      </button>
      <button  onClick={ShowSolution}  className={` px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xl sm:text-3xl mt-2 sm:mt-4 `}
      disabled = {show}>
        View Solution
      </button>
      <button  onClick={nextpuzzle}  className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xl sm:text-3xl mt-2 sm:mt-4">
        Next Puzzle
      </button>
      <NavLink to={'/'} onClick={changeSel}>

            <button  className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xl sm:text-3xl mt-2 sm:mt-4">
                Back to Menu
            </button>
      </NavLink>

    </div>

      {
        show &&(
          <SolutionBoard solvedBoard={showboard} setShow={setShow} show={show}/>
          
        )
      }


  {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
          <h2 className="text-3xl mb-4">Result</h2>
          <p>{text}</p>
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    )}
        
    </div>
  )
}

export default GamePage
