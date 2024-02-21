// Importing React
import React from "react"; // Case sensative 
import ReactDOM from "react-dom/client";
// Importing Assets
import "./index.css";


/* Notes
  - <React.StrictMode>
    strict mode is really not a big deal. The only thing that it does is that during development
    it will render all components twice in order to find certain bugs. And also React will check if we're using outdated 
    parts of the React API. Always good to have when developing.

  - React Components
    React applications are entirely made out of components.
    Building blocks of user interface in React'
    Piece of UI that has its own data, logic and appearance (how it works and looks).
    We build complex UIs by building multiple components and combining them together (Composition).
    Components can be reused, nested inside each other, and pass data between them.
  
  - JSX
    Declarative syntax to describe what components look like and how they work.
    Components must return a block of JSX
    Extensionn of Javascript that allows us to embed Javascript , CSS and React components into HTML.
    Each JSX element is converted to a React.createElement function call (seen below).

    <header> 
      <h1> style="color: red">
        Hello React!
      </h1>
    </header>

    React.createElement(
      'header',
      null,
      React.createElement(
        'h1',
        {style: {color: 'red'}},
        'Hello React!'
      )
    )

    We could use React without JSX but that would make things really hard to understand.
    JSX is a Declarative approach.
    React is an abstraction away from DOM: We never touch the DOM.

    - Rules for JSX
      JSX works essentially like HTML, but we can enter 'Javascript mode' by using the {} (for text or attributes).
      We can place Javascript expressions inside {}.
        Eample: reference variables, create arrays or objects, [] .map(), ternary operator.
      Statements are not allowed (if/else, for, switch).
      JSX produces a Javascript expression
      We can pass other pieces of JSX inside {}
      We can write JSX anywhere inside a component(in if/else, assign to variables, pass it into functions).
      A piece of JSX can only have ONE root element. If you need more, use <React.fragment> (or the short <>).


  - Separation of concerns
    Traditional way used one technology per file so you had all your logic within different files, HTML wouldnt make much
    sense without the Javascript file or visa versa.
      HTML, CSS & Javascript
    React one component per file
     JSX(HTML), CSS & Javascript
     Each components UI and logic are all within one place, making it easier to keep track of what logic is used where.
  

  - Styling components
    React doesnt really have a prefered way when it comes to styling components
    We could use inline styles, external CSS, SASS files, CSS modules, Styled components or Tailwind etc.
    Dont use inline styles theyre disgusting as anytenk!.

    - className instead of class (class is a reserved keyword in javascript already).

  - Curly braces
    React's curly braces {} are used within JSX to let you bring JavaScript logic and variables into your markup.

  - Props
    Are used to pass data from parent components to child components (down the component tree)
    Props only allows us to pass data down from parent to child (one way) and not from child to parent (there are ways to do this "lifting the state up").
    Essentail tool to configure and customize components (like function paramenters).
    Anything can be passed as props: single values, arrays, objects, functions, even other components.

    - Rules when it comes to props
      Props are read-only, they are immutable!!! this is one of Reacts strict

  - Rendering a list
    https://react.dev/learn/rendering-lists
    You will often want to display multiple similar components from a collection of data.
    You can use the JavaScript array methods to manipulate an array of data.

  - Conditional rendering
    https://react.dev/learn/conditional-rendering
    Your components will often need to display different things depending on different conditions. 
    In React, you can conditionally render JSX using JavaScript syntax like if statements, &&, and ? : operators.

  - React fragments
    https://react.dev/reference/react/Fragment
    <Fragment>, often used via <>...</> syntax, lets you group elements without a wrapper node (like using a separate div).
    

*/

// Data
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

/* 
  App component, this is usually its own component within 'src' folder, its inside the "App" component where 
  we usually compose all other components together
*/
const App = () => {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
};

const Menu = () => {
  const pizzas = pizzaData;
  const numPizza = pizzas.length;

  return (
    <main className="menu">
      <h2>Our menu</h2>
      {/* Rendering list of Pizza component */}
      {/* <div>
        {pizzaData.map((pizza) => (
          <Pizza
            name={pizza.name}
            ingredients={pizza.ingredients}
            photoName={pizza.photoName}
            price={pizza.price}
          />
        ))}
      </div> */}

      {/* <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza {...pizza} key={pizza.name}/> 
        ))}
      </ul> */}

      {/* Conditional rendering */}

      {/* With Tenary operator */}
      {numPizza > 0 ? (
        // React fragment
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from out stove oven, all organic and delicious!
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : null}

      {/* With && operator
        {pizzas > 0 && (
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        )} 
      */}
    </main>
  );
};

// Reusable components (seen above composed inside 'App' component)
const Pizza = ({pizzaObj}) => { // Destructoring of props
  // Early return
  // if (pizzaObj.soldOut) return null;
  
  return (
    /*
      Conditional styles
       When using conditional styles like below
        <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
       This will leave us with white space at the end of a class name in the html
        <li class="pizza ">
       Doing it via ternary like below wont (Look at the quotation marks white space)
        <li class="pizza">
       Not really a big thing but it can look weird.
    */
    <li className={pizzaObj.soldOut ? "pizza sold-out" : "pizza"}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : `£${pizzaObj.price}`}</span>
      </div>
    </li>
  );
};

const Header = () => {
  /* 
    Notes
    Inline styling
      styles we have to define these styles using a Javascript object
      CSS property names have been converted basically in JSX to camel case notation.
  */

  // return <h1 style={{color: "red", fontSize: "50px", textTransform: "uppercase"}}> Fast React Pizza Co.</h1>
  return (
    <header className="header">
      <h1> Fast React Pizza Co.</h1>
    </header>
  );
};

const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpened = hour >= openHour && hour <= closeHour;

  // Using the React.creatElement way for an example (arg1 element, args2 props, args3 child element)
  // Obv we wouldnt create components like this as you can see below how hard it is to read at times.
  return React.createElement(
    "footer",
    { className: "footer" },
    null,
    // Conditional rendering
    isOpened && <Order closeHour={closeHour} openHour={openHour}/>
  );
};

const Order = ({closeHour, openHour}) => {
  return (
    <div className="order">
      <p>We're open from {openHour}:00 to {closeHour}:00. Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  );
};

// React version 18
// This creates a root to tell React which root element within index.html where to render the application
const root = ReactDOM.createRoot(document.getElementById("root"));

// This is what we are rendering the "App"
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
React before 18

import ReactDOM from "react-dom";

root.render(<App />, document.getElementById("root"));

*/