## Learning React Hooks

This app is to help me learn React Hooks

#### What are React Hooks?

Hooks are a feature that lets you use state and other React features without writing a class.

---

First we need to update our `package.json` to reflect the alfa version of react. Lets install `react@next` and `react-dom@next`. Now we will see the update in `package.json`.

```json
"dependencies": {
    "react": "^16.8.0-alpha.0",
    "react-dom": "^16.8.0-alpha.0",
    "react-scripts": "2.1.3"
  }
```

Lets create a class component with state and make a button that increments on click.

```javascript
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    count: 0
  };

  incrementCount = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.incrementCount}>
          I was clicked {this.state.count} times
        </button>
      </div>
    );
  }
}

export default App;
```

Now lets create the same functionality using a stateless component and _Hooks_.

```javascript
import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={incrementCount}>I was clicked {count} times</button>
    </div>
  );
};

export default App;
```

First thing take note of is `useState`, this is how we create state. Now let's create state `const [count, setCount] = useState(0);`.

- **count**: the value in state.
- **setCount**: this is how you set state. You can name this whatever you want. Its only responsible for updating that piece of state.
- **useState**: this is the value of initial state

## PrevState

Lets looks at the difference on how to use PrevState.

```javascript
incrementCount = () => {
  this.setState(prevState => ({
    count: prevState.count + 1
  }));
};
```

With **Hooks**

```javascript
const incrementCount = () => {
  setCount(prevCount => prevCount + 1);
};
```

## Toggle State with useState

Let's create a toggle feature.

```javascript
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    count: 0,
    isOn: false
  };

  incrementCount = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  toggleLight = () => {
    this.setState(prevState => ({
      isOn: !prevState.isOn
    }));
  };

  render() {
    return (
      <div className="App">
        <> <------------------- New Way of React.Fragment
          <h2>Counter</h2>
          <button onClick={this.incrementCount}>
            I was clicked {this.state.count} times
          </button>

          <h2>Toggle Light</h2>
          <div
            style={{
              height: "50px",
              width: "50px",
              background: this.state.isOn ? "yellow" : "grey"
            }}
            onClick={this.toggleLight}
          />
        </> <------------------- New Way of React.Fragment
      </div>
    );
  }
}

export default App;
```

With **Hooks**

```javascript
import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const toggleLight = () => {
    setIsOn(prevIsOn => !prevIsOn);
  };

  return (
    <div>
      <>
        <h2>Counter</h2>
        <button onClick={incrementCount}>I was clicked {count} times</button>

        <h2>Toggle Light</h2>
        <div
          style={{
            height: "50px",
            width: "50px",
            background: isOn ? "yellow" : "grey"
          }}
          onClick={toggleLight}
        />
      </>
    </div>
  );
};

export default App;
```
