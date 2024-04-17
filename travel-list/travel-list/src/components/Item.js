const Item = ({ item, onDeleteItem, onToggleItem }) => {
  {/* Destructuring of props (props.item)*/}
  return (
    <li>
      <input type='checkbox' value={item.packed} onChange={() => onToggleItem(item.id)}/>
      {/* Conditional styling with ternary operator */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

export default Item;