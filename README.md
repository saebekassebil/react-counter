# react-counter

A dead-simple incremental counter component with easing animations.

    npm install react-counter

```js
var React = require('react');
var Counter = require('react-counter');

React.render(
  <Counter begin={0} end={1000} time={2000} easing="outCube" />,
  document.body
);
```

## Usage

```js
<Counter
  begin={Number}  // The number to count from
  end={Number}    // The number to count to
  time={Number}   // The time (in ms) the counting animation should take
  easing={String} // Which easing function to use (default="outCube")
  />
```

The `easing` property, can be a name of any easing function from
[ease-component](https://www.npmjs.com/package/ease-component)
