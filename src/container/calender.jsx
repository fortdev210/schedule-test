import React, { useEffect } from "react"
import { useDispatch } from 'react-redux'
import axios from 'axios'

import Time from "./time"
import DateCont from "./date"

import { updateData } from '../redux/schedule/schedule.action'

let timezone 

function Calender() {
  const dispatch = useDispatch()

  let timeDate = new Date();

  const getTimeZone = () => {
    timezone = timeDate.toString().split(" ")[5]
    timezone = timezone.slice(0, timezone.length - 2) + ":00"
  }

  getTimeZone()

  const getDataFromServer = async () => {
    let today = new Date();
    let fiveDaysLater = new Date();
    fiveDaysLater.setDate(today.getDate()+5);
    await axios.get('http://localhost:8080/availability', { params: { startDate: today, endDate: fiveDaysLater } })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <p className="timezone">Yor timezone:{timezone}</p>
      <div className="date-content">
        <DateCont />
      </div>
      <div className="time-content">
        <Time />
      </div>
    </div>
  )
}

export default Calender