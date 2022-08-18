import React, { useState } from 'react'

function DaySelection() {

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const [checkedState, setCheckedState] = useState(
        new Array(days.length).fill(false)
    )

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((day, index) =>
          index === position ? !day : day
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
                    name={day}
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