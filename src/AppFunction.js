import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <button onClick={incrementCount}>I was clicked {count} times</button>
    </div>
  );
};

export default App;
