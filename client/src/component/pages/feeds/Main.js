import React, { useState } from 'react'
import FeedsNav from './navbar/FeedsNav'
import CardsContainer from './cards/CardsContainer'

const Main = () => {
  const [data, setData] = useState();
  return (
    <div>
      <FeedsNav setData={setData} data={data}/>
      <CardsContainer setData={setData} data={data}/>
    </div>
  )
}

export default Main
