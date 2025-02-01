import React, { useState } from 'react'



const Board = ({board,initialState,setInputboard,getrow,getcol,isValid,inputRefs, focusedRow, focusedCol }) => {
    
    const handleChange = (value, row, col) => {
        const newBoard = board.map((r, rIndex) =>
          r.map((c, cIndex) => (rIndex === row && cIndex === col ? (value === "" ? 0 : parseInt(value)) : c))
        );
        setInputboard(newBoard);
        
      }
      function validinput(e,board,row,col)
      {

        const value = e.target.value;
        if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 9)) {
           { 
                e.target.value = value;
                if(isValid(parseInt(value),row,col,board))
                {
                    e.target.style.color ="black";
                }
                else
                {
                    e.target.style.color ="red";
                }

           }
        } else {
            e.target.value = "";
        }
            
      }
      const passFocus=(row,col)=>{
            // e.preventDefault();
            getrow(row);
            getcol(col);
      }
  return (
    <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md overflow-x-auto">

        <table className="w-full border-collapse">
            <tbody>
        {

            [0,1,2,3,4,5,6,7,8].map((row,rindex)=>{
                return(
                    <tr key={rindex}>{
                        
                        [0,1,2,3,4,5,6,7,8].map((col,cindex)=>{
                            const isTopBorder = rindex % 3 === 0;
                            const isLeftBorder = cindex % 3 === 0;
                            const isBottomBorder = rindex === 8;
                            const isRightBorder = cindex === 8;
            
                            const borderTop = isTopBorder ? '4px solid black' : '1px solid gray';
                            const borderLeft = isLeftBorder ? '4px solid black' : '1px solid gray';
                            const borderBottom = isBottomBorder ? '4px solid black' : '1px solid gray';
                            const borderRight = isRightBorder ? '4px solid black' : '1px solid gray';
                            const isFocused = row === focusedRow && col === focusedCol;
                            return(
                                <td key={cindex}  style={{ borderTop, borderLeft, borderBottom, borderRight }}>


                                <input type="text"  className={`w-full aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl p-1 sm:p-2 md:p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-center
                          ${board[row][col] === 0 ? "bg-pink-100" : "bg-green-100"}
                          ${initialState[row][col] !== 0 ? "text-gray-600" : "text-black"}
                             ${isFocused ? "bg-yellow-200" : ""}    
                        `}key={rindex+cindex}  value={board[row][col]==0? "" :board[row][col]} disabled={initialState[row][col]!==0?true:false} 
                                style={board[row][col]==""?{backgroundColor:"lightpink"}:{backgroundColor:"lightgreen"}}
                                onChange={(e) => handleChange(e.target.value, row, col)}
                                onInput={(e)=>validinput(e,board,row,col)}
                                onFocus={()=>{
                                    passFocus(row,col);
                                }}
                                ref={(el) => {
                                    if (!inputRefs.current[row]) {
                                      inputRefs.current[row] = [];
                                    }
                                    inputRefs.current[row][col] = el;
                                  }}
                                />
                                
                                </td>
                            )
                        })
                    }
                    </tr>
                
            )})
        }
        </tbody>
        </table>
        </div>
    </div>
  )
}

export default Board
