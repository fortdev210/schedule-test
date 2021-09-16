import { test } from "ramda"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

import TimeCom from "../components/time.component"

const startTime = 8
const endTime = 21
let initTime = {}

function Time() {

  const [timeObj, setTimeState] = useState({})
  const { receiveData, selectedDate } = useSelector(state => state.scheduleReducer)

  const initTimeLine = () => {
    setTimeState({})
    initTime = {}
    for (let index = startTime; index <= endTime; index++) {
      initTime[`${index}:00`] = false
    }
    setTimeState(initTime)
  }

  const calcTime = () => {
    let datas = receiveData.filter(data => data.date === selectedDate)
    if (datas.length) {
      datas[0].availableSlots.map((data) => {
        for (let index = Number(data.startTime.split(":")[0]); index <= Number(data.endTime.split(":")[0]); index++) {
          let buffer = timeObj
          buffer[`${index}:00`] = true
          setTimeState({ ...buffer })
        }
      })
    }
  }

  useEffect(() => {
    initTimeLine()
    calcTime()
  }, [receiveData, selectedDate])

  return (
    <>
      {Object.keys(timeObj).map((time, key) => {
        return (
          <TimeCom time={{ time, state: timeObj[time] }} key={key} />
        )
      })}
    </>
  )
}

export default Time