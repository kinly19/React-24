/*
  Notes

    Thinking in React as a process
    - Break the desired UI into components and establish the component tree
    - build a static version in React (without state)
    - Think about state;
       When to use state
       Types of state: local vs global
       Where to place each piece of state
    - Establish data flow:
       One-way data flow
       Child-to-parrent communication
       Accessing global state
    
    What is state management
    - Deciding when to create pieces of state, what types of states are necessary
      where to place each piece of state and how data flows through the app.

    - Local state vs Global state
      Local state
       State needed only by one or few components.
       State that is defined in a component and only that
       component and child components have access to it.
       We should always start with local state and only move to global if
       we truly need it.
      
      Global state
       State that many components might need access too.
       Shared state that is accessible to every component in the entire application (content API Redux etc).

    - State: When and Where?
      ====================================== When to create state ===================================================
         When storing data as yourself
         Need to store data -> Will data change at some point? -> if no -> Use regular const variable.
                              if yes
                              Can be computed from exisiting state/prop -> if yes -> Derive state.
                              if no
                              should it re-render component? -> if no - Ref(useRef).
                              if yes
                              Place a new piece of state in component

      ====================================== Where to place state ===================================================

                              Only used by this component -> if yes -> Leave in component
                              if no
                              Also used by a child component -> if yes -> Pass to child via props.
                              if no
                              Used by one or a few sibling components? -> if yes -> Lift state up to first common parent
                              if No
                              Use global state


    States vs Props
    - State is internal data owned by the component
      Components memory
      Can be updated by the component itself.
      Updating of state causes the component to re-render (any nested child components within that component).
      Used to make components interactive.

    - Props is external data owned by a parent component given to a child component
      Similar to function parameters.
      Read only (Cannot be changed by the component receiving them).
      This makes sense but is good to remember, when a child prop receives new props.
      this will also cause the component to re-render also. (usually when parent state has been updated).

    Derived state
    - State that is computed from an existing piece of state or from props.
    - Most of the time will we not be able to derive state but whenever we can always go towards using derived state
    

*/
import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

// List Data
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 2, packed: false },
];


const App = () => {
  const [items, setItems] = useState([...initialItems]);
  console.log(items)

  // Fucntion will be passed down to a child to lift its data up to parent
  const handleAddItems = (item) => {
    setItems([...items, item])
  }

  const handleDeleteItem = (itemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));

    // Same as above 
    // const newItemList = []
    // items.forEach(item => {
    //   if (item.id !== itemId) newItemList.push(item);
    // }) 

    // setItems([...newItemList2])
  }

  const handleToggleItem = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClearItemsList = () => {
    // Window: confirm() - https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
    const confirmed = window.confirm("Are you sure you want to delete all items?");
    if (confirmed) setItems([]);
  };

  return (
    <div className="app">
      {/* Using composition, using smaller components added together to build a bigger component*/}
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearItemsList={handleClearItemsList}/> {/* Item component used inm here */}
      <Stats items={items} />
    </div>
  );
};

export default App;

// Each of these components below would be placed as their own file

