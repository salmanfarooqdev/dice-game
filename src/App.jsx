import { useEffect, useState } from "react";
import "./App.css";
import Box from "./box";
import { v4 as uuidv4 } from "uuid";

function App() {
  const generateRandom = () => {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      let rand = Math.ceil(Math.random() * 6);
      const uniqueId = uuidv4();
      newDice.push({ id: uniqueId, value: rand, state: false });
    }
    return newDice;
  };

  const [dice, setAllDice] = useState(generateRandom());
  const [win, setWin] = useState(false);

  let diceMap = dice.map((die) => {
    const styles = {
      backgroundColor: "green",
    };
    return (
      <Box
        onClick={() => handleBoxClick(die.id)}
        key={die.id}
        style={die.state ? styles : {}}
        value={die.value}
        dice={dice}
        setAllDice={setAllDice}
        id={die.id}
      />
    );
  });

  const handleButton = () => {
    if (win) {
      setAllDice(generateRandom());
      setWin(false);
    } else {
      const newDice = [];

      const updatedDice = dice.map((die) => {
        if (die.state === false) {
          let rand = Math.ceil(Math.random() * 6);
          const uniqueId = uuidv4();
          newDice.push({ id: uniqueId, value: rand, state: false });
        } else {
          newDice.push(die);
        }
      });

      setAllDice(newDice);
    }
  };

  useEffect(() => {
    let dieValue = dice[0].value;
    let flag = false;
    for (let i = 0; i < 10; i++) {
      if (dice[i].state === true && dice[i].value === dieValue) {
        flag = true;
      } else {
        flag = false;
        break;
      }
    }

    if (flag === false) {
      setWin(false);
    } else {
      setWin(true);
    }
  }, [dice]);

  return (
    <>
    <h1 className="title">Dice Game</h1>
    <div className="subtitle">Press a dice to hold it. Make all the Dices the same number to win!</div>
    <div className="container">
      {diceMap}

      <div className="button-container">
        <button onClick={handleButton}>{win ? "Play Again" : "Roll"}</button>
      </div>
    </div>
    </>
  );
}

export default App;
