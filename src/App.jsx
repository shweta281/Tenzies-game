import React from "react";
import Die from "./Die";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const firstValue = dice[0].value;
    const allHeld = dice.every((die) => die.held);
    const allSameNumber = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameNumber) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    const newarr = [];
    for (let i = 0; i < 10; i++) {
      newarr.push({
        value: Math.ceil(Math.random() * 6),
        held: false,
        id: nanoid(),
      });
    }
    return newarr;
  }
  // console.log(dice);

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        id={die.id}
        value={die.value}
        held={die.held}
        holdDice={holdDice}
      />
    );
  });

  function rollUnheldDice() {
    if (!tenzies) {
      setDice((prevState) =>
        prevState.map((die) => {
          return die.held
            ? die
            : { ...die, value: Math.ceil(Math.random() * 6), id: nanoid() };
        })
      );
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }

  function holdDice(dieId) {
    // console.log(dieId);

    setDice((prevState) => {
      const newarr = [];
      for (let i = 0; i < prevState.length; i++) {
        if (prevState[i].id === dieId) {
          newarr.push({ ...prevState[i], held: prevState[i].held ^ 1 });
        } else {
          newarr.push(prevState[i]);
        }
      }
      return newarr;
    });
  }
  // console.log(allNewDice());

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
     <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollUnheldDice}>
        {tenzies? "Reset" : "Roll"}
      </button>
    </main>
  );
}

// import React from "react"
// import Confetti from "react-confetti"
// import Die from "./Die"

// export default function App() {
//     const [dice, setDice] = React.useState(allNewDice())
//     const [tenzies, setTenzies] = React.useState(false)

//     React.useEffect(() => {
//         const firstValue = dice[0].value
//         const allHeld = dice.every(die => die.held)
//         const allSameNumber = dice.every(die => die.value === firstValue)
//         if(allHeld && allSameNumber) {
//             setTenzies(true)
//         }
//     }, [dice])

//     function randomDieValue() {
//         return Math.ceil(Math.random() * 6)
//     }

//     function allNewDice() {
//         const newArray = []
//         for(let i = 0; i < 10; i++) {
//             const newDie = {
//                 value: randomDieValue(),
//                 held: false,
//                 id: i + 1
//             }
//             newArray.push(newDie)
//         }
//         return newArray
//     }

//     function rollUnheldDice() {
//         if (!tenzies) {
//             setDice((oldDice) => oldDice.map((die, i) =>
//                 die.held ?
//                     die :
//                     { value: randomDieValue(), held: false, id: i + 1 }
//             ))
//         } else {
//             setDice(allNewDice())
//             setTenzies(false)
//         }
//     }

//     function holdDice(id) {
//         setDice(prevDice => prevDice.map(die => {
//             return die.id === id ?
//                 {...die, held: !die.held} :
//                 die
//         }))
//     }

//     const diceElements = dice.map((die) => (
//         <Die key={die.id} {...die} hold={() => holdDice(die.id)} />
//     ))

//     return (
//         <main>
//             {tenzies && <Confetti />}
//             <h1>Tenzies</h1>
//             <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
//             <div className="die-container">{diceElements}</div>
//             <button className="roll-dice" onClick={rollUnheldDice}>
//                 {tenzies ? "Reset Game" : "Roll"}
//             </button>
//         </main>
//     )
// }
