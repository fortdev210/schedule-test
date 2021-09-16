import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import DateCom from "../components/date.component"

let weekly = []

const startOfWeek = (date) => {
  let diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

const endOfWeek = (date) => {
  let lastday = date.getDate() - (date.getDay() - 1) + 6;
  return new Date(date.setDate(lastday));
}
const endOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function DateCont({ date }) {
  const [useDate, setDateState] = useState({});
  const { selectedDate, receiveData } = useSelector(state => state.scheduleReducer);


  const initDate = () => {
    let startWeek = startOfWeek(new Date())
    let endMonth = endOfMonth(new Date())
    let endWeek = endOfWeek(new Date())
    if (endMonth.getDate() > endWeek.getDate()) {
      for (let index = startWeek.getDate(); index <= endWeek.getDate(); index++) {
        weekly.push({ date: index + 1, wed: 'wed' })
      }
    } else {
      for (let index = startWeek.getDate(); index <= endMonth.getDate(); index++) {
        weekly.push({ date: index + 1 })
      }
    }
  }

  useEffect(() => {
    initDate()
  }, [date])

  return (
    <>
      {weekly.map((data, key) => {
        let state

        if (receiveData.filter(d => d.date.split("/")[0] === data.date.toString()).length) {
          state = 'schedule'
        }

        if (Number(selectedDate.split('/')[0]) == data.date) {
          state = 'active'
        }

        return (
          <DateCom key={key} data={{ data, state }} />
        )
      })}
    </>
  )
}

export default DateCont