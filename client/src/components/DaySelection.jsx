import React, { useEffect, useState } from 'react'

function DaySelection({setSelectedDays}) {

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    // Create array to store checked status for each day
    const [checkedState, setCheckedState] = useState(
        new Array(days.length).fill(false)
    )
    
    // When a checked status is changed 
    useEffect(() => {
      
      const checkedDays = checkedState.map((result, index) => {
       return result == true ? days[index] : null
      })

      setSelectedDays(checkedDays.filter((day) => day != null))

    }, checkedState)
  

    const handleOnChange = (position) => {

        // Updates the checkedState array to change status when checkbox is clicked
        const updatedCheckedState = checkedState.map((dayOfWeek, index) =>
            index === position ? !dayOfWeek : dayOfWeek
        )
        setCheckedState(updatedCheckedState);
    }


  return (

    <div className="flex flex-col justify-center p-5 border-b border-solid border-slate-200">
      <p className="text-xl mb-2 font-bold">Set Days:</p>
      <ul className="flex flex-row">
        {days.map((day, index) => {
          return (
            <li key={index}>
              <div className="day">
                <div className="flex flex-row">
                  <input
                    className="mr-1 ml-5"
                    type="checkbox"
                    id={index}
                    name='day'
                    value={day}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label>{day}</label>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DaySelection