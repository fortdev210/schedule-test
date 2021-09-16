import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

function DateCom({ data: {data, state} }) {
  return (
    <div className={`date ${state}`}>
      <div className="top">{data.date}</div>
      <div className="down">{data.wed}</div>
    </div>
  )
}

export default DateCom