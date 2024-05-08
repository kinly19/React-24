const Stats = ( {items} ) => {
  // Use of early return to avoid doing unnecessary calculations below if we have no items in packing list
  if (!items.length)
    return (
      <p className="stats">
        <em>Start! adding items to your packing list!</em>
      </p>
    );

  // Using Derived state;
  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const percentage = Math.round(numPacked / numItems * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You have everything! Ready to go ✈"
          : `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
};

export default Stats;