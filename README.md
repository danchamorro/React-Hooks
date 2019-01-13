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

## Implementing a Login Form with Multiple State Values

Here we implement user login form with Hooks.

```javascript
import React, { useState } from "react";

// function declaration instead of arrow function
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      username,
      password
    };
    setUser(userData); // Send form data to state
  };

  return (
    <div
      style={{
        textAlign: "center"
      }}
    >
      <h2>Login</h2>
      <form
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center"
        }}
        onSubmit={handleSubmit} // Place the function inline.
      >
        <input
          type="text"
          placeholder="Username"
          onChange={event => setUsername(event.target.value)} // Place the function inline.
        />
        <input
          type="password"
          placeholder="Password"
          onChange={event => setPassword(event.target.value)} // Place the function inline.
        />
        <button type="submit">Submit</button>
      </form>
      {user && JSON.stringify(user, null, 2)}
    </div>
  );
}
```

## Implementing a Register Form with a Single State Value

Here we can implement our register form. We will create an initial state outside our component so that on submit the form is reset.

```javascript
import React, { useState } from "react";

// Initial State
const initialFormState = {
  username: "",
  email: "",
  password: ""
};

export default function Register() {
  const [form, setForm] = useState(initialFormState); // Set state to initial state

  const [user, setUser] = useState(null);

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setUser(form);
    setForm(initialFormState); // set to initial state after from submission.
  };

  return (
    <div
      style={{
        textAlign: "center"
      }}
    >
      <h2>Register</h2>
      <form
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center"
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={form.username}
        />
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={form.password}
        />
        <button type="submit">Submit</button>
      </form>
      {user && JSON.stringify(user, null, 2)}
    </div>
  );
}
```

# Summary

I found that `useState` / Hooks in my opinion is much more flexible than only using state in class-based components. Having the option to declare individual pieces of state or use an object for state as well have state in functional components is great. I also find that the code is cleaner and more readable. Rather than write `this.state.form.username` or destructuring, we can simply write `form.username` when using Hooks. As a new developer, I don't yet have many strong opinions, but I'm sure that will change as my knowledge and skill level grows. I did find that the concept of React Hooks was easy to grasp. My next task is to learn how to do Data Fetching with Hooks / Replacing Class Lifecycle Methods (useEffect, useRef). The repo to that learning process can be found [here](#).
