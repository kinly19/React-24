import { useState } from 'react';
import Item from './Item';

const PackingList = ({ items, onDeleteItem, onToggleItem, onClearItemsList }) => {
  /*
    Notes
    localeCompare() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  */

  // Sorting list
  const [sortBy, setSortBy] = useState("input");

  // Using derived state to sort list
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  
  // slice method to create a new array which the sort method can mutate keeping the original array intact
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  // packed is a boolen value ('true', 'false') so we use Number method to convert this string value into a number
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  const handleSelection = (e) => {
    setSortBy(e.target.value);
  }

  return (
    <div className='list'>
      <ul>
        {sortedItems.map((listItem) => (
          <Item
            item={listItem}
            key={listItem.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => handleSelection(e)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearItemsList}>Clear List</button>
      </div>
    </div>
  );
};

export default PackingList;