import React from 'react'

const Display = ({image}) => {
  return (
    <div>
      <img src={URL.createObjectURL(image)} alt='Display Image' className='border rounded-2xl h-24 w-32
       object-cover ' />

    </div>
  )
}

export default Display
