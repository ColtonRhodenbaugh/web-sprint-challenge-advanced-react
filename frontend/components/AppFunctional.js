import React from 'react'
import { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const gridSize= [
    [1, 1], [2, 1], [3, 1],
    [1, 2], [2, 2], [3, 2],
    [1, 3], [2, 3], [3, 3]
  ]
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [index, setIndex] = useState(4);
  const [steps,setSteps] = useState(0);
  const [grid, setGrid] = useState(gridSize);

  function getXY(grid) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return grid[index]
  }

  function getXYMessage(grid) {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    if(index === 0){
      return(`(${(grid[0])})`)
    }else if (index === 1){
      return(`(${(grid[1])})`)
    }else if (index === 2){
      return(`(${(grid[2])})`)
    }else if (index === 3){
      return(`(${(grid[3])})`)
    }else if (index === 4){
      return(`(${(grid[4])})`)
    }else if (index === 5){
      return(`(${(grid[5])})`)
    }else if (index === 6){
      return(`(${(grid[6])})`)
    }else if (index === 7){
      return(`(${(grid[7])})`)
    }else if (index === 8){
      return(`(${(grid[8])})`)
    }
  }

  function reset(email) {
    // Use this helper to reset all states to their initial values.
    setEmail(''), setIndex(4), setMessage(''), setSteps(0)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === 'left' && index !== 0 && index !== 3 && index !== 6){
      setIndex(index - 1)
      setSteps(steps + 1)
    }else if (direction === 'right' && index !== 2 && index !== 5 && index !== 8){
      setIndex(index +1)
      setSteps(steps + 1)
    }else if (direction === 'up' && index !== 0 && index !== 1 && index !== 2){
      setIndex(index - 3)
      setSteps(steps + 1)
    }else if (direction === 'down' && index !== 6 && index !== 7 && index !== 8){
      setIndex(index + 3)
      setSteps(steps + 1)
    }else setMessage(`You can't go ${direction}`)
  }

  //function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  //}
  
  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value)
    return email;
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    const pData = {
      "x": getXY(grid)[0],
      "y": getXY(grid)[1],
      "steps": steps,
      "email": email
    }
    axios.post('http://localhost:9000/api/result', pData)
    .then(response => {
      setMessage(response.data.message)
      console.log(message)
    }).catch(error => {
      setMessage(error.response.data.message)
    })
    setEmail('')
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXYMessage(grid)}</h3>
        <h3 id="steps">You moved {steps} time{(steps === 1 ? null : 's')}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message" value={message}>{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" data-testid='left' onClick={() => { getNextIndex('left') }}>LEFT</button>
        <button id="up" data-testid='up' onClick={() => { getNextIndex('up') }}>UP</button>
        <button id="right" data-testid='right' onClick={() => { getNextIndex('right') }}>RIGHT</button>
        <button id="down" data-testid='down' onClick={() => { getNextIndex('down') }}>DOWN</button>
        <button id="reset" data-testid='reset' onClick={reset}>reset</button>
      </div>
      <form>
        <input data-testid='email' id="email" type="email" placeholder="type email" onChange={onChange} value={email}></input>
        <input id="submit" type="submit" onClick={onSubmit}></input>
      </form>
    </div>
  )
}
