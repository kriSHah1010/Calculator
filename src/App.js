import { useReducer } from "react"
import "./App.css"
import Digitbutton from "./Digitbutton"
import Operationbutton from "./Operationbutton"

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'
}
function reducer(state, { type, payload }){
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }

      if(payload.digit === "0" && state.currentOperand === "0")
      {
        return state
      }
      if(payload.digit === "." && state.currentOperand.includes("."))
      {
        return state
      }


      return{
        ...state,
        currentOperand:`${ state.currentOperand  || ""}${ payload.digit }`
      }
      case ACTIONS.CHOOSE_OPERATION:
        if(state.currentOperand == null && state.previousoperand == null)
        {
          return state
        }

        if(state.currentOperand == null)
        {
          return {
            ...state,
            operation: payload.operation,
          }
        }

        if (state.previousoperand == null )
        {
          return {
            ...state,
            operation: payload.operation,
            previousoperand: state.currentOperand,
            currentOperand: null,        
          }
        }

        return {
          ...state,
          previousoperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null,
        }
      case ACTIONS.CLEAR:
        return {}

      case ACTIONS.DELETE_DIGIT:
        if(state.overwrite){
          return{
            ...state,
            overwrite: false,
            currentOperand: null
          }
        }
        if(state.currentOperand == null ) return state
        if(state.currentOperand.length === 1){
          return {
            ...state,
            currentOperand: null
          }
        }
      case ACTIONS.EVALUATE:
        if(state.operation == null || state.currentOperand == null || state.previousoperand == null)
        {
          return state
        }

        return {
          ...state,
          overwrite: true,
          previousoperand: null,
          operation: null,
          currentOperand: evaluate(state)

        }
  }
}

function evaluate({ currentOperand, previousoperand, operation})
{
  const prev = parseFloat(previousoperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "/":
      computation = prev / current
      break
  }
  return computation.toString()
}

function App() {
  const[{ currentOperand, previousoperand, operation}, dispatch] = useReducer(reducer, {})
  
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousoperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
        <button className="span-two" 
        onClick={() => dispatch({ type: ACTIONS.CLEAR})}>AC</button>
        <button 
        onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT})}>DEL</button>
        <Operationbutton operation="/" dispatch={dispatch} />
        <Digitbutton digit="1" dispatch={dispatch} />
        <Digitbutton digit="2" dispatch={dispatch} />
        <Digitbutton digit="3" dispatch={dispatch} />
        <Operationbutton operation="*" dispatch={dispatch} />
        <Digitbutton digit="4" dispatch={dispatch} />
        <Digitbutton digit="5" dispatch={dispatch} />
        <Digitbutton digit="6" dispatch={dispatch} />
        <Operationbutton operation="+" dispatch={dispatch} />
        <Digitbutton digit="7" dispatch={dispatch} />
        <Digitbutton digit="8" dispatch={dispatch} />
        <Digitbutton digit="9" dispatch={dispatch} />
        <Operationbutton operation="-" dispatch={dispatch} />
        <Digitbutton digit="." dispatch={dispatch} />
        <Digitbutton digit="0" dispatch={dispatch} />
        <button className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE})}>=</button>
      </div>
      
      );
}


export default App


/* comment 1 */
/* comment 2 */
/* comment 3 */
/* comment 4 */
