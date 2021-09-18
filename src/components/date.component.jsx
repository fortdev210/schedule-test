import React from "react"
import { useDispatch } from 'react-redux'
import { updateDate } from '../redux/schedule/schedule.action'

function DateCom({ data: {data, state} }) {
  const dispatch = useDispatch()
  return (
    <div className={`date ${state}`} onClick={() => dispatch(updateDate({ date: data.date }))}>
      <div className="top">{data.date}</div>
      <div className="down">{data.day}</div>
    </div>
  )
}

export default DateCom