import React, { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import axios from 'axios'

import Time from "./time"
import DateCont from "./date"

import { updateData } from '../redux/schedule/schedule.action'

let timezone 

function Calender() {
  const [datas, setData] = useState([])
  const dispatch = useDispatch()

  let timeDate = new Date();
  let today;

  const getTimeZone = () => {
    timezone = timeDate.toString().split(" ")[5]
    timezone = timezone.slice(0, timezone.length - 2) + ":00"
  }

  getTimeZone()

  const getDataFromServer = async () => {
    await axios.get('http://localhost:8080/availability')
      .then(function (response) {
        timeDate.getDate() < 10 ? today = '0' + timeDate.getDate() : today = timeDate.getDate()
        timeDate.getMonth() + 1 < 10 ? today += '/0' + (timeDate.getMonth() + 1) : today = '/' + (timeDate.getMonth() + 1)
        today += `/${timeDate.getFullYear()}`

        dispatch(updateData({ data: response.data, date: today }))
        return response.data
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  useEffect(() => {
    getDataFromServer()
  }, [])

  return (
    <div>
      <p className="timezone">Yor timezone:{timezone}</p>
      <div className="date-content">
        <DateCont date={datas} />
      </div>
      <div className="time-content">
        <Time time={datas} />
      </div>
    </div>
  )
}

export default Calender