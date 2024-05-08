import { useState } from 'react';

const Form = ({ onAddItems }) => {
  /*
    We could have left all the state and functions out in the app component as before
    But because all of the states and functions are only being used for this form component
    its best to keep it isolated only to where its used that way we also dont need to unnecessarily 
    pass down so many props to the form component. 
    
    Only the 'Items' State is kept within the app component because that data 
    is needed (Lifting state up) to be passed back down to 'packinglist' component in order to render
    list out to the ui.
  */
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (e) => {
    console.log(Number(e.target.value));
    setQuantity(Number(e.target.value));
  }

  const handleInput = (e) => {
    setDescription(e.target.value);
    console.log(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) {
      alert("Input cannot be empty");
      return;
    }

    console.log(e.target.value);
    // reset input field
    setDescription("");
    setQuantity(1);

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    // Lifting state up
    onAddItems(newItem);
  }
  
  return (
    <form className="add-form" onSubmit={handleSubmit} >
      <h3>What do you need for your trip? 😍</h3>
      <select value={quantity} onChange={handleQuantity}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((optionItem) => (
          <option value={optionItem} key={optionItem}>
            {optionItem}
          </option>
        ))}
      </select>

      {/* 
        Above is a nice trick for using an array to map out a list of option elements vs doing it manually like below
        <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        </select>
      */}

      <input type="text" placeholder="Item..." value={description} onChange={handleInput}></input>
      <button>Add</button>
    </form>
  );
};

export default Form;