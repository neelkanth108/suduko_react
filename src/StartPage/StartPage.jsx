import React, {useContext,useState } from 'react'
import { NavLink } from "react-router"
import { GameContext } from '../contexts/gameContext';

const StartPage = () => {
const {sel,setSel,generateBoard} = useContext(GameContext)
  const handleSelectChange = (event) => {
    if (event.target.value !== 'not to be selected') {
      setSel(true);

    }
  };
  const checkSel =(e)=>{
    if(!sel){

      e.preventDefault();
      alert("select difficulty first");
    }
    else
    {
      generateBoard();
    }
  }
  return (
    <div className='w-full items-center flex flex-col justify-center gap-8'>
        <h1 className="text-4xl font-bold mb-4">
            SUDUKO
        </h1>
        <select name="" id="Difficulty" className='w-90 h-40 p-6 text-5xl text-center rounded-lg ' onChange={handleSelectChange} defaultValue='not to be selected'>
            <option value='not to be selected' disabled >Select difficulty</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
        </select>
        <NavLink  to={'/game'} onClick={checkSel}>
          <button  className={` px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-xl sm:text-3xl mt-2 sm:mt-4 `}>Start</button>
       
          </NavLink> 
      
    </div>
  )
}

export default StartPage
