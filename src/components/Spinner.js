import React from 'react'
import spinnerLoad from '../spinnerLoad.gif'
function Spinner(){
 
    return (
      <div className='text-center' width="5px">
        <img src={spinnerLoad} alt="Loading ..." />
      </div>
    )
  
}

export default Spinner