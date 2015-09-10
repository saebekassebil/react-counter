var React = require('react');
var raf = require('raf');
var ease = require('ease-component');

var Counter = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.begin,
      time: this.props.time,
      begin: this.props.begin,
      end: this.props.end,
      easing: this.props.easing,
      start:  Date.now(),
      stop: false
    };
  },

  componentDidMount: function() {
    raf(this.animate);
  },

  animate: function() {
    if (this.state.stop) return;

    raf(this.animate);
    this.draw()
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      time: nextProps.time,
      begin: nextProps.begin,
      end: nextProps.end,
      easing: nextProps.easing,
      start: Date.now(),
      stop: false
    });

    raf(this.animate);
    this.draw();
  },

  draw: function() {
    if (!this.isMounted()) return;

    var time = this.state.time;
    var begin = this.state.begin;
    var end = this.state.end;
    var easing = this.state.easing;

    easing = easing && easing in ease ? easing : 'outCube';

    var now = Date.now();
    if (now - this.state.start >= time) {
      this.setState({
        stop: true
      });
    }

    var percentage = (now - this.state.start) / time;
    percentage = percentage > 1 ? 1 : percentage;
    var easeVal = ease[easing](percentage);
    var val = begin + (end - begin) * easeVal;

    this.setState({
      value: val
    });
  },

  render: function() {
    return React.DOM.span({ className: 'counter' }, Math.round(this.state.value));
  }
});

module.exports = Counter;
