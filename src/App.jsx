import React from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'



function App() {
  const [dieValues, setDieValues] = React.useState(randomNumArr)
  const [rollCount, setRollCount] = React.useState(1)
  const [tenzies, setTenzies] = React.useState(false)
  const [time, setTime] = React.useState(0);
  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = React.useState(false);


  React.useEffect(() => {
    let allHeld = dieValues.every(die => die.isHeld)
    let allSameValues = dieValues.every(die => die.value === dieValues[0].value)
    if (allHeld && allSameValues) {
      setTenzies(true)
      console.log("You Won!")
      setIsRunning(isRunning => !isRunning)
    }

    let anyHeld = dieValues.some(die => die.isHeld)
    if (anyHeld && !isRunning) {
      setIsRunning(isRunning => !isRunning)
    }

  }, [dieValues]
  )




  function randomNumArr() {
    const nums = []
    for (let i = 0; i < 10; i++) {
      nums.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return nums
  }

  function holdDieFace(id) {
    setDieValues(dieValues => dieValues.map((die) =>
      (id === die.id) ? { ...die, isHeld: !die.isHeld } : die))
  }



  const dieFaces = dieValues.map((die) =>
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      handleClick={() => holdDieFace(die.id)} />)


  function rollDice() {
    if (!isRunning) {
      setIsRunning(isRunning => !isRunning)
    }
    setRollCount((rollCount) => rollCount += 1)
    const newValues = randomNumArr()
    setDieValues(dieValues => dieValues.map((die, ind) =>
      (die.isHeld === false) ? { ...newValues[ind], id: die.id } : die))
  }

  function resetGame() {
    setDieValues(randomNumArr)
    setTenzies(false)
    setRollCount(1)
    setTime(0)
    setIsRunning(false)
  }

  ///////////////////      StopWatch    //////////////////// 


  React.useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  //Timer
  const timer = {
    minutes: Math.floor((time % 360000) / 6000),
    seconds: Math.floor((time % 6000) / 100),
    milliseconds: time % 100
  }



  return (
    <>
      {tenzies && <Confetti gravity={0.3} />}
      <main>
        <button className='restart' onClick={resetGame} ></button>
        <div id="game-info" className="info">
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <h3 className="stopwatch-time"> Rolls: {rollCount}</h3>
          <div>

            <h3 className="stopwatch-time">
              <span>Time: </span>
              {timer.minutes.toString().padStart(2, "0")}<span className='mini'>min </span>:
              {timer.seconds.toString().padStart(2, "0")}<span className='mini'>sec </span>:
              {timer.milliseconds.toString().padStart(2, "0")}<span className='mini'>msec </span>
            </h3>
          </div>
        </div>
        <div id="game-section" className="info">
          {dieFaces}
        </div>
        <div className="info">
          <button id="game-button" onClick={rollDice}>{tenzies ? "You Won!" : "Roll Dice"}</button>
        </div>


      </main>
    </>
  );
}

export default App;
