import React from 'react'

const Button = (props) => {
    function show()
    {
        props.getsolved();
        
    }
  return (
    <button className="px-6 py-2 text-3xl bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={show}>
  Solve it
</button>

  )
}

export default Button
