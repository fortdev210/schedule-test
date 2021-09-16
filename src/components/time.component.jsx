import React from "react"

function TimeCom({ time: { time, state } }) {
  return (
    <>
      {state ? (<div className="time active">{time}</div>) : (<div className="time">{time}</div>)}
    </>
  )
}

export default TimeCom