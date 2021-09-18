import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'

import TimeCom from "../components/time.component"

const startTime = 8
const endTime = 21
let initTime = {}

function Time() {

  const [timeObj, setTimeState] = useState(null)
  const { receiveData, selectedDate } = useSelector(state => state.scheduleReducer)

  
  useEffect(() => {
    const calcTime = () => {
      let datas = receiveData.filter(data => data.date === selectedDate)
      initTime = {}
      for (let index = startTime; index <= endTime; index++) {
        initTime[`${index}:00`] = false
      }
      if (datas.length) {
        datas[0].availableSlots.map((data) => {
          let buffer = initTime || {}
          for (let index = Number(data.startTime.split(":")[0]); index <= Number(data.endTime.split(":")[0]); index++) {
            buffer[`${index}:00`] = true
          }
          setTimeState({ ...buffer })
          return data
        })
      } else {
        setTimeState({ ...initTime })
      }
    }
    calcTime()
  }, [selectedDate])

  return (
    <>
      {Object.keys(timeObj || {}).map((time, key) => {
        return (
          <TimeCom time={{ time, state: timeObj[time] }} key={key} />
        )
      })}
    </>
  )
}

export default Time