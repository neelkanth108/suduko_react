import React from 'react'

const SolutionBoard = ({solvedBoard,setShow,show}) => {
function closethesolution()
{
    setShow(false);
}
  return (
    <div className="w-64 max-w-md overflow-x-auto">

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
            
                            return(
                                <td key={cindex}  style={{ borderTop, borderLeft, borderBottom, borderRight }}>
                                {/* <input type="text"  className={`w-full aspect-square text-lg sm:text-xl md:text-2xl lg:text-3xl p-1 sm:p-2 md:p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-center`}key={rindex+cindex} 
                                value={solvedBoard[row][col]}
                                style={solvedBoard[row][col]==""?{backgroundColor:"lightpink"}:{backgroundColor:"lightgreen"}}
                                />
                                 */}
                                 <div>
                                    {solvedBoard[row][col]}
                                 </div>
                                </td>
                            )
                        })
                    }
                    </tr>
                
            )})
        }
        </tbody>
        </table>
        <button onClick={closethesolution} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">close solution</button>
        </div>
  )
}

export default SolutionBoard
