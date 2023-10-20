import React from "react";
import './App.css';
import Die from './Die';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
  const [diceState, setDiceState] = React.useState(allNewDice())

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect( () => {
    console.log("Dice state changed")
    let count = 0
    let newArr = []
    for(let i=0; i<diceState.length; i++)
    {
      // eslint-disable-next-line no-unused-expressions
      diceState[i].isHeld ? count++ : count
      newArr.push(diceState[i].value)
    }
    let uniqueArray = newArr.filter(function(item, pos) {
      return newArr.indexOf(item) === pos});
      if (uniqueArray.length === 1 && count === 10) {
        setTenzies(true)
        console.log("You won!")
    } else console.log("not yet")
  }, [diceState])



  function allNewDice(){
    const arr= [];
    for (let i=0; i<10; i++){
       arr.push({
         value: Math.ceil(Math.random() * 6),
         isHeld: false,
         id: nanoid()
        });
    }
    return arr;
  }

    function rollDice(){
      if (tenzies)
      return document.location.reload(true) 
      else {
      setDiceState(prevArr => prevArr.map(die => {
        return die.isHeld === false ? 
          {...die, value: Math.ceil(Math.random() * 6)}: 
          die
        })
        )
      }}

    const diceElements = diceState.map(die => {
      return (<Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice (die.id)}/>)})

      function holdDice (id){
        setDiceState(prevArr => prevArr.map(die => {
          return die.id === id ? {
            ...die, isHeld: !die.isHeld} : 
            die
        })
        )}

  function newGame(){
    return tenzies ? "New Game": "Roll";
  }
    

  return (
    <main>
    {tenzies && <Confetti />}
    <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="main-container">
        {diceElements}
      </div>
      <button  className="rollDice" onClick={rollDice}>{newGame()}</button>
    </main>
  );
}
