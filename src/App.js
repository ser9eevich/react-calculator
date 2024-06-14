import './App.css';
import { useState } from 'react';
import Wrapper from './components/Wrapper/Wrapper.js';
import Output from './components/Output/Output.js';
import ButtonBox from './components/ButtonBox/ButtonBox.js';
import Button from './components/button/button.js';

const btnValues = [
  ["C", "±", "%", "÷"],
  [7, 8, 9, "×"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

function App() {

  let [calc, setCalc] = useState({
    prevValue: 0,
    result: 0,
    significance: "",
  });

  const clearClickHandler = () => {
    setCalc({
      ...calc,
      prevValue: 0,
      result: 0,
      significance: "",
    });
    console.log(`Clear function`);
  };

  const reverseClickHandler = () => {
    setCalc({
      ...calc,
      prevValue: calc.prevValue ? calc.prevValue * -1 : 0,
      result: calc.result ? calc.result * -1 : 0,
      significance: "",
    })
    console.log(`Reverse funciton`)
  }

  const percentClickHandler = () => {
    setCalc({
      ...calc,
      prevValue: (calc.prevValue /= Math.pow(100,1)),
      result: (calc.result /= Math.pow(100,1)),
      significance: "",
    })
    console.log(`Percent funciton`)
  }
  
  const dotClickHandler = (value) => {
    setCalc({
      ...calc,
      prevValue: calc.prevValue.toString().includes(value) === false ? calc.prevValue = (String(calc.prevValue) + value) : calc.prevValue
    })
    console.log('dot function')
  }

  const equalsClickHandler = () => {
    
    const math = (a, b, significance) => {
      console.log(significance);
      let result;

      switch(significance) {
        case "-": 
          result = a - b;
          break;
        case "+": 
          result = a + b;
          break;
        case "×": 
          result = a * b;
          break;
        default:
          result = a / b;
      }

      return result;
    }
    
    setCalc({
      ...calc,
      result: math(Number(calc.result), Number(calc.prevValue), calc.significance),
      prevValue: 0,
      significance: "",
    })
    console.log(`Equals funciton`)
  }

  const signClickHandler = (value) => {
    setCalc({
      ...calc,
      significance: value,
      result: !calc.result && calc.prevValue ? calc.prevValue : calc.result,
      prevValue: 0,
    })
    console.log(`${calc.sign} - Sign funciton`)
  }

  const numClickHandler = (value) => {
    setCalc({
      ...calc,
      prevValue: calc.prevValue === 0 && value === "0"
        ? "0"
        : Number(String(calc.prevValue) + value),
      result: calc.result,
    })
    console.log(`${value} clicked`);
  };

  return (
    <Wrapper>
      <Output>
        {calc.prevValue ? calc.prevValue : calc.result}
      </Output>
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return(
              <Button
                className={typeof(btn) === 'number' ? (btn === 0 ? "btn-key-0": undefined) : "actions"}
                value={btn}
                onClick={() => {
                  switch(btn) {
                    case("C"): clearClickHandler(); break;
                    case("±"): reverseClickHandler(); break;
                    case("%"): percentClickHandler(); break;
                    case("."): dotClickHandler(btn); break;
                    case("="): equalsClickHandler(); break;
                    case("÷"):
                    case("×"):
                    case("-"):
                    case("+"): signClickHandler(btn); break;
                    default: numClickHandler(btn);
                  }
                }}
              />
            )
          })
        }
      </ButtonBox>
    </Wrapper>
  );
}

export default App;