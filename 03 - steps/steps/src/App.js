// Root component of application

import { useState } from "react";

/* Notes
  - React State
      Data that a component can hold over time, necessary for information that it needs to Remember throughout the app's lifecycle.
      A Components own memory.
      State variable / piece of state (this word is used interchangeably)
      - A single variable in a component, different pieces of state within a component.
      Updating component state (important to remember)
      - Will trigger React to re-render the whole component...
      Always update react state with its setter function - useState = [state, setState]
      Never ever ever set states manually! as react wont know when a state has been updated leaving you with a stale state.
      State is isolated inside of each component.

      Practical guidelines about React state
      - Use a state variable for any data that the component should keep track of ('Remember') over time. This is data
        that will change at some point. In Vanilla JS, thats a let variable, or an [] or {}.
      - Whenever you want something in the component to be DYNAMIC, create apiece of state related to that 'Thing'
        and update the state when the 'thing' should change (aka 'be dynamic').
        For example: A modal window can be open or closed. So we create a state variable isOpen that tracks whether the modal
        is open or not. on isOpem = true we display the window, on isOpen = false we hide it.
      - If you want to change the way a component looks, or the data is displays, update  its state.
        This usually happens in an event handler function.
      - When building a component, imagine its view as a relection of state changing over time.
      - For data that should NOT trigger component re-renders, DONT use state. Use regular variables instead.
        This is a common beginner mistake!.


      How State actually works
      - In React, a view is updated by re-rendering the component (See it as React removing a view and replacing with a new one)
      - State is preserved throughout re-renders unless it is removed from the ui entirely (Unmounting).
      - When a piece of state is updated the component is automatically re-rendered (To reflect changes).
      - Frameworks exist to help keep UI in sync with data.
  
  - React hooks
      Can always be identified with the 'use' keyword at the start of each hook e.g (useState, useReducer, useMemo) etc.
      Can only use React hooks at the top level of the function (the component function) not inside an if statement, inside a loop or another function.

  - Children prop
    https://react.dev/reference/react/Children
    An empty 'hole' that can be filled by any JSX which the component receives as a children. 
    Used to display whatever you include between the opening and closing tags when invoking a component.
    Essential tool to make reusable and configurable components.

  - Side notes
    Inside the public folder ('vanilla.html'), you can see the Vanilla implementation of this React project.

*/

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsopen] = useState(true);

  const [test, setTest] = useState({name: "Lee"});

  const incrementStepHandler = () => {
    /* prevStep++ wont work because, prevStep++ returns the value of prevStep then increments it. Whereas ++prevStep increments it first then returns the incremented value*/
    if (step < 3) setStep((prevStep) => ++prevStep);
    // If the condition above fails we run an early return.
    return;

    // BAD PRACTICE (Mutating objects directly without setter function)
    // test.name = "Fred";

    // Actual way when updaating an object in React.
    // setTest({name: "Fred"});
  };

  const decrementStepHandler = () => {
    // Same as the above shorthand
    if (step > 1) setStep((prevStep) => prevStep - 1); 
    // passing a call back function which will receive as an argument the current value of the state.
    // https://www.reddit.com/r/reactjs/comments/sxr0t7/why_use_functions_when_updating_state_variable_in/ (Good explanation)
    return;
  };

  const handleToggle = () => {
    setIsopen(prevState => !prevState); // Toggle state to oppersit of current state.
    // setStep(1);
  }

  const Button = ({bgColor, color, onClick, children}) => {
    return (
      <button style={{backgroundColor: bgColor, color: color}} onClick={onClick}>
        {children}
      </button>
    )
  }

  const StepMessage = ({ step, children }) => {
    return (
      <div className="message">
        <h3>Step {step}:</h3>
        {children}
      </div> 
    );
  };

  return (
    <>
      <button className="close" onClick={handleToggle}>&times;</button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage step={step}>{messages[step - 1] }</StepMessage>  {/* 'messages' array in the array of 'step' */}
          <div className="buttons">
            <Button bgColor={"#7590f2"} color={"#fff"} onClick={decrementStepHandler}><span>👈</span>prev</Button>
            <Button bgColor={"#7590f2"} color={"#fff"} onClick={incrementStepHandler}><span>👉</span>next</Button>
          </div>
        </div> 
      )}
    </>
  )};

export default App;
