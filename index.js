var React = require('react');
var raf = require('raf');
var ease = require('ease-component');

var Counter = React.createClass({
  getInitialState: function() {
    return { value: this.props.begin };
  },

  componentDidMount: function() {
    this.start = Date.now();
    raf(this.animate);
  },

  animate: function() {
    if (this.stop) return;

    raf(this.animate);
    this.draw()
  },

  draw: function() {
    if (!this.isMounted()) return;

    var time = this.props.time;
    var begin = this.props.begin;
    var end = this.props.end;
    var easing = this.props.easing;

    easing = easing && easing in ease ? easing : 'outCube';
    var now = Date.now()
    if (now - this.start >= time) this.stop = true;
    var percentage = (now - this.start) / time;
    percentage = percentage > 1 ? 1 : percentage;
    var easeVal = ease[easing](percentage);
    var val = begin + (end - begin) * easeVal;

    this.setState({ value: val });
  },

  render: function() {
    return React.DOM.span({ className: 'counter' }, Math.round(this.state.value));
  }
});

module.exports = Counter;
